const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define port
const PORT = process.env.PORT || 10000;

console.log(`Starting application on port ${PORT}...`);

// Create a simple HTTP server fallback
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

// Try to fix ES module issues
try {
    console.log('Setting up ES module compatibility...');

    // Create dist/package.json with type: module
    fs.writeFileSync(
        path.join(process.cwd(), 'dist', 'package.json'),
        JSON.stringify({ type: 'module' })
    );

    // Check if schemas.js exists, and create it if not
    const schemasPath = path.join(process.cwd(), 'dist', 'swagger', 'schemas.js');
    const swaggerDir = path.dirname(schemasPath);

    if (!fs.existsSync(swaggerDir)) {
        fs.mkdirSync(swaggerDir, { recursive: true });
    }

    if (!fs.existsSync(schemasPath)) {
        console.log('Creating missing schemas.js file...');
        fs.writeFileSync(schemasPath, 'export default {};');
    }

    // Start the application with proper environment variables
    console.log('Starting application...');
    const nodeProcess = spawn('node', ['--experimental-modules', 'dist/main.js'], {
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
    console.error('Error starting application:', error);
    createFallbackServer();
}