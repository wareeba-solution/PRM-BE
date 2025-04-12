"use strict";
// src/build-workarounds.ts
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
// Add any exported utilities here
};
//# sourceMappingURL=build-workarounds.js.map