const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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

try {
    console.log('Setting up ES module compatibility...');

    // Ensure dist directory exists
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }

    // Create dist/package.json with type: module
    fs.writeFileSync(
        path.join(distPath, 'package.json'),
        JSON.stringify({ type: 'module' })
    );

    // Start the application with comprehensive module loading
    console.log('Starting application...');
    const nodeProcess = spawn('node', [
        '--experimental-modules',
        '--es-module-specifier-resolution=node',
        'dist/main.js'
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
} catch (error) {
    console.error('Critical error starting application:', error);
    createFallbackServer();
}