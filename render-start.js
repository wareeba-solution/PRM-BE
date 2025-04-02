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

const fixImportPaths = (dir) => {
    console.log(`Fixing import paths in: ${dir}`);
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                fixImportPaths(filePath);
                return;
            }

            if (file.endsWith('.js')) {
                let content = fs.readFileSync(filePath, 'utf8');

                // Fix specific known problem imports
                if (file === 'swagger.service.js' && filePath.includes('/swagger/')) {
                    console.log(`Fixing Swagger service imports in ${filePath}`);
                    content = content.replace(
                        /from ['"]\.\/schemas['"]/g,
                        `from './schemas/index.js'`
                    );
                }

                // Fix all relative imports that don't have .js extension, but avoid double extensions
                content = content.replace(
                    /from ['"]([\.\/][^'"]*?)(?!\.js['"])['"]/g,
                    (match, importPath) => {
                        // Skip if it already has .js extension
                        if (importPath.endsWith('.js')) {
                            return match;
                        }

                        if (importPath.endsWith('/')) {
                            return `from '${importPath}index.js'`;
                        }
                        return `from '${importPath}.js'`;
                    }
                );

                // For the main.js file, add special care to not double-extend
                if (file === 'main.js') {
                    console.log(`Applying special fixes to main.js`);
                    content = content.replace(
                        /from ['"]\.\/app\.module\.js\.js['"]/g,
                        `from './app.module.js'`
                    );
                }

                fs.writeFileSync(filePath, content);
            }
        });
    } catch (error) {
        console.error(`Error fixing import paths in ${dir}:`, error);
    }
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

    // Create dist/package.json with type: module
    fs.writeFileSync(
        path.join(distPath, 'package.json'),
        JSON.stringify({ type: 'module' })
    );

    // Fix import paths after creating package.json
    fixImportPaths(distPath);

    // Manual fix for main.js to app.module.js if problem exists
    const mainJsPath = path.join(distPath, 'main.js');
    if (fs.existsSync(mainJsPath)) {
        let mainContent = fs.readFileSync(mainJsPath, 'utf8');
        mainContent = mainContent.replace(
            /from ['"]\.\/app\.module(\.js)?\.js['"]/g,
            `from './app.module.js'`
        );
        fs.writeFileSync(mainJsPath, mainContent);
    }

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
            NODE_ENV: 'production',
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_PORT: process.env.DB_PORT || '5432',
            DB_USERNAME: process.env.DB_USERNAME || 'postgres',
            DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
            DB_NAME: process.env.DB_NAME || 'prm_db'
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