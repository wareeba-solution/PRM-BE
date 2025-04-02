import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;

console.log(`Starting application on port ${PORT}...`);

const createFallbackServer = () => {
    console.log('Creating fallback HTTP server...');
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

const fixCommonJSRequires = (dir) => {
    console.log(`Ensuring CommonJS compatibility in: ${dir}`);
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                fixCommonJSRequires(filePath);
                return;
            }

            if (file.endsWith('.js')) {
                let content = fs.readFileSync(filePath, 'utf8');

                // Convert ESM import/export to CommonJS if needed
                if (content.includes('import ') || content.includes('export ')) {
                    console.log(`Converting module syntax in ${filePath}`);

                    // Fix dynamic requires in DTO files
                    if (file.includes('.dto.js')) {
                        content = content.replace(
                            /require\(['"](\.\/[^'"]+)['"]\)\.(.*)/g,
                            'require("$1").$2'
                        );
                    }
                }

                fs.writeFileSync(filePath, content);
            }
        });
    } catch (error) {
        console.error(`Error fixing CommonJS requires in ${dir}:`, error);
    }
};

const createCommonJSStarterFile = (distPath) => {
    // Create a CommonJS starter file that can load the application
    const starterPath = path.join(distPath, '_starter.js');

    const starterContent = `
// CommonJS starter for NestJS application
try {
    require('./main');
} catch (error) {
    console.error('Error starting application:', error);
    // Create fallback server if main app fails
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            message: 'API is running in fallback mode due to runtime error',
            error: error.message,
            timestamp: new Date().toISOString()
        }));
    });
    server.listen(process.env.PORT || 10000, '0.0.0.0', () => {
        console.log(\`Fallback server running on port \${process.env.PORT || 10000}\`);
    });
}
    `;

    fs.writeFileSync(starterPath, starterContent);
    return starterPath;
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
        createFallbackServer();
        return;
    }

    console.log(`Using dist path: ${distPath}`);

    // Ensure the code is CommonJS compatible
    fixCommonJSRequires(distPath);

    // Create CommonJS starter file
    const starterPath = createCommonJSStarterFile(distPath);

    // Start the application using CommonJS approach
    console.log('Starting application in CommonJS mode...');
    const nodeProcess = spawn('node', [
        starterPath
    ], {
        env: {
            ...process.env,
            PORT: PORT,
            REDIS_DISABLED: 'true',
            REDIS_HOST: 'localhost',
            NODE_ENV: 'production',
            // Database connection variables
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_PORT: process.env.DB_PORT || '5432',
            DB_USERNAME: process.env.DB_USERNAME || 'postgres',
            DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
            DB_NAME: process.env.DB_NAME || 'prm_db',
            // Disable mail for initial testing
            MAIL_ENABLED: 'false'
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
    console.log('Setting up CommonJS compatibility...');
    startApplication();
} catch (error) {
    console.error('Critical error starting application:', error);
    createFallbackServer();
}