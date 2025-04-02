import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 10000;

console.log(`Starting application on port ${PORT}...`);

const createFallbackServer = () => {
    console.log('Creating fallback HTTP server...');
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            message: 'API is running in fallback mode due to module resolution issues',
            timestamp: new Date().toISOString()
        }));
    });

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Fallback server running on port ${PORT}`);
    });
};

const debugFileSystem = (basePath) => {
    console.log(`Debugging file system in: ${basePath}`);

    const walkDir = (dir) => {
        try {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    console.log(`[DIR] ${fullPath}`);
                    walkDir(fullPath);
                } else {
                    console.log(`[FILE] ${fullPath}`);
                }
            });
        } catch (error) {
            console.error(`Error walking directory ${dir}:`, error);
        }
    };

    walkDir(basePath);
};

const startApplication = () => {
    // Determine the correct dist path
    const possibleDistPaths = [
        path.join(process.cwd(), 'dist'),
        path.join(process.cwd(), 'build'),
        path.join(process.cwd(), 'out'),
        path.join(__dirname, 'dist')
    ];

    let distPath = null;
    for (const testPath of possibleDistPaths) {
        if (fs.existsSync(testPath)) {
            distPath = testPath;
            break;
        }
    }

    if (!distPath) {
        console.error('No dist directory found. Possible compilation issue.');
        debugFileSystem(process.cwd());
        createFallbackServer();
        return;
    }

    console.log(`Using dist path: ${distPath}`);

    // Debug the contents of the dist directory
    debugFileSystem(distPath);

    // Create dist/package.json with type: module
    fs.writeFileSync(
        path.join(distPath, 'package.json'),
        JSON.stringify({ type: 'module' })
    );

    // Find the main entry point
    const mainCandidates = [
        path.join(distPath, 'main.js'),
        path.join(distPath, 'src', 'main.js'),
        path.join(distPath, 'dist', 'main.js')
    ];

    let mainPath = null;
    for (const candidate of mainCandidates) {
        if (fs.existsSync(candidate)) {
            mainPath = candidate;
            break;
        }
    }

    if (!mainPath) {
        console.error('No main.js found. Possible compilation issue.');
        createFallbackServer();
        return;
    }

    console.log(`Using main path: ${mainPath}`);

    // Start the application with comprehensive module loading
    console.log('Starting application...');
    const nodeProcess = spawn('node', [
        '--experimental-modules',
        '--es-module-specifier-resolution=node',
        mainPath
    ], {
        env: {
            ...process.env,
            PORT: PORT,
            REDIS_DISABLED: 'true',
            REDIS_HOST: 'localhost',
            NODE_ENV: 'production'
        }
    });

    // Forward stdout and stderr
    nodeProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    nodeProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    // Improved error handling
    nodeProcess.on('error', (err) => {
        console.error('Failed to start application:', err);
        createFallbackServer();
    });

    // If the process fails to start, fall back to a simple HTTP server
    nodeProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`Application failed to start (exit code ${code}), using fallback server...`);
            createFallbackServer();
        } else {
            console.log(`Application exited with code ${code}`);
            process.exit(code);
        }
    });
};

try {
    console.log('Setting up ES module compatibility...');
    startApplication();
} catch (error) {
    console.error('Critical error starting application:', error);
    createFallbackServer();
}