const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define port
const PORT = process.env.PORT || 3000;

console.log(`Starting application on port ${PORT}...`);

// Check if we're trying to run an ES module
let mainPath = 'dist/main.js';
try {
    const mainContent = fs.readFileSync(path.join(process.cwd(), mainPath), 'utf8');
    const isEsm = mainContent.includes('import ') || mainContent.includes('export ');

    if (isEsm) {
        console.log('Detected ESM syntax, setting appropriate Node options');
        process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --experimental-specifier-resolution=node`;
    }
} catch (err) {
    console.warn('Could not read main.js file to check module type:', err.message);
}

// Start the application with environment variables
const nodeProcess = spawn('node', [mainPath], {
    env: {
        ...process.env,
        PORT: PORT,
        REDIS_DISABLED: 'true',
        REDIS_HOST: 'localhost',
        NODE_ENV: 'production',
        // Add any other environment variables your app needs
    }
});

// Forward stdout and stderr
nodeProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
});

nodeProcess.stderr.on('data', (data) => {
    process.stderr.write(data);
});

// Listen to the exit event
nodeProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
});