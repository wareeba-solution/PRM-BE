const { spawn } = require('child_process');

// Define port
const PORT = process.env.PORT || 3000;

console.log(`Starting application on port ${PORT}...`);

// Start the application with environment variables to prevent Redis issues
const nodeProcess = spawn('node', ['dist/main.js'], {
    env: {
        ...process.env,
        PORT: PORT,
        REDIS_HOST: 'localhost',
        REDIS_PORT: '6379',
        REDIS_DISABLED: 'true',
        NODE_OPTIONS: '--no-warnings' // Suppress Redis connection warnings
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