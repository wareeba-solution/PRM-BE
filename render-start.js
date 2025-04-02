const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define port
const PORT = process.env.PORT || 10000;

console.log(`Starting application on port ${PORT}...`);

// Check for module issues
try {
    // Create a package.json with "type": "module" inside the dist directory
    fs.writeFileSync(
        path.join(process.cwd(), 'dist', 'package.json'),
        JSON.stringify({ type: 'module' })
    );

    // Check for missing .js extensions in imports
    console.log('Fixing import paths for ES modules...');
    const fixImportPaths = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                fixImportPaths(filePath);
                return;
            }

            if (file.endsWith('.js')) {
                let content = fs.readFileSync(filePath, 'utf8');

                // Fix imports without file extensions
                content = content.replace(
                    /from ['"]([^'"]+)['"]/g,
                    (match, importPath) => {
                        if (
                            !importPath.endsWith('.js') &&
                            !importPath.startsWith('./node_modules') &&
                            !importPath.startsWith('/') &&
                            !importPath.startsWith('http') &&
                            importPath.indexOf('/') > -1 &&
                            !importPath.startsWith('@')
                        ) {
                            return `from '${importPath}.js'`;
                        }
                        return match;
                    }
                );

                fs.writeFileSync(filePath, content);
            }
        });
    };

    fixImportPaths(path.join(process.cwd(), 'dist'));
    console.log('Import paths fixed.');
} catch (err) {
    console.warn('Error preparing ES modules:', err);
}

// Start the application with environment variables
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

// Listen to the exit event
nodeProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
});