import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const PORT = process.env.PORT || 10000;

console.log(`Starting application on port ${PORT}...`);

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

function startApplication() {
    const distPath = path.join(process.cwd(), 'dist');

    if (!fs.existsSync(distPath)) {
        console.error('No dist directory found.');
        createFallbackServer();
        return;
    }

    console.log(`Using dist path: ${distPath}`);

    // Start the application
    console.log('Starting NestJS application...');
    const nodeProcess = spawn('node', [
        path.join(distPath, 'main.js')
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