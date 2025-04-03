import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;

console.log(`Starting application on port ${PORT}...`);
console.log(`Current working directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);

function createFallbackServer() {
    console.log('Creating fallback HTTP server...');
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            message: 'API is running in fallback mode',
            timestamp: new Date().toISOString()
        }));
    });

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Fallback server running on port ${PORT}`);
    });
}

function findDistPath() {
    // Try multiple potential paths
    const potentialPaths = [
        path.join(process.cwd(), 'dist'),
        path.join(process.cwd(), 'src', 'dist'),
        path.join(__dirname, 'dist'),
        path.join(__dirname, '..', 'dist'),
        path.join(__dirname, 'src', 'dist')
    ];

    for (const distPath of potentialPaths) {
        console.log(`Checking potential dist path: ${distPath}`);
        if (fs.existsSync(distPath)) {
            console.log(`Found dist directory: ${distPath}`);

            // List files in the dist directory for debugging
            try {
                const files = fs.readdirSync(distPath);
                console.log('Files in dist directory:', files);
            } catch (err) {
                console.error('Error reading dist directory:', err);
            }

            return distPath;
        }
    }

    return null;
}

function fixModuleImports(dir) {
    console.log(`Fixing module imports in: ${dir}`);
    try {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) {
                fixModuleImports(fullPath);
            } else if (file.name.endsWith('.js')) {
                console.log(`Processing file: ${fullPath}`);
                let content = fs.readFileSync(fullPath, 'utf8');

                // Add .js extension to relative imports
                content = content.replace(
                    /from\s+['"]([\.\/][^'"]*?)['"](?!\s*;)/g,
                    (match, importPath) => {
                        // Skip if already has .js extension
                        if (importPath.endsWith('.js')) {
                            return match;
                        }
                        // Skip node_modules imports
                        if (importPath.includes('node_modules')) {
                            return match;
                        }
                        // Handle directory imports
                        if (importPath.endsWith('/')) {
                            return `from '${importPath}index.js'`;
                        }
                        return `from '${importPath}.js'`;
                    }
                );

                // Fix require statements in swagger/dto files
                if (fullPath.includes('dto') || fullPath.includes('swagger')) {
                    content = content.replace(
                        /require\(['"]([\.\/][^'"]+)['"]\)/g,
                        (match, importPath) => {
                            if (!importPath.endsWith('.js')) {
                                return `require('${importPath}.js')`;
                            }
                            return match;
                        }
                    );
                }

                fs.writeFileSync(fullPath, content);
            }
        }
    } catch (error) {
        console.error(`Error fixing imports in ${dir}:`, error);
    }
}

function createPackageJson(distPath) {
    // Create a package.json in the dist directory to control module type
    const packageJsonPath = path.join(distPath, 'package.json');
    const packageJson = {
        "type": "module"
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Created package.json in ${distPath}`);
}

function startApplication() {
    const distPath = findDistPath();

    if (!distPath) {
        console.error('No dist directory found. Checking current directory structure:');
        try {
            console.log('Current directory contents:', fs.readdirSync(process.cwd()));
        } catch (err) {
            console.error('Error reading current directory:', err);
        }

        createFallbackServer();
        return;
    }

    console.log(`Using dist path: ${distPath}`);

    // Create package.json in dist directory
    createPackageJson(distPath);

    // Fix module imports in the dist directory
    fixModuleImports(distPath);

    // Attempt to find the main application entry point
    const mainJsPath = [
        path.join(distPath, 'main.js'),
        path.join(distPath, 'src', 'main.js')
    ].find(fs.existsSync);

    if (!mainJsPath) {
        console.error('Cannot find main.js in dist directory');
        createFallbackServer();
        return;
    }

    console.log(`Starting application from: ${mainJsPath}`);

    // Start the application
    console.log('Starting NestJS application...');
    const nodeProcess = spawn('node', [
        '--experimental-specifier-resolution=node',
        '--experimental-modules',
        mainJsPath
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

    // Error handling
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
}

try {
    startApplication();
} catch (error) {
    console.error('Critical error starting application:', error);
    createFallbackServer();
}