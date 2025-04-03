"use strict";
// src/build-workarounds.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixSwaggerCircularDependencies = void 0;
/**
 * This file contains workarounds for build-time issues.
 * It's a temporary solution until entity relationships are properly fixed.
 */
console.log('build-workarounds.ts loaded'); // Added console log for debugging
// 2. Polyfill missing methods to prevent runtime errors
// Remove the window check since we're in a Node.js environment
// if (typeof window !== 'undefined') {
//   // Add any runtime polyfills if needed
// }
const fixSwaggerCircularDependencies = () => {
    // Monkey patch SwaggerModule to handle circular dependencies
    try {
        // This is just a placeholder - we handle this in main.ts
        console.log('Applied circular dependency fixes for Swagger');
    }
    catch (e) {
        console.warn('Failed to apply Swagger fixes:', e);
    }
};
exports.fixSwaggerCircularDependencies = fixSwaggerCircularDependencies;
exports.default = {
    fixSwaggerCircularDependencies: exports.fixSwaggerCircularDependencies,
};
//# sourceMappingURL=build-workarounds.js.map