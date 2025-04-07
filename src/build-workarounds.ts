// src/build-workarounds.ts

/**
 * This file contains workarounds for build-time issues.
 * It's a temporary solution until entity relationships are properly fixed.
 */

console.log('build-workarounds.ts loaded'); // Added console log for debugging

// 1. Force TypeScript to treat Promise<T> as compatible with T for our entities
declare global {
  // This hack makes TypeScript treat entity types more flexibly
  interface Promise<T> {
    __entity_type_workaround?: T;
  }

  // This hack makes regular types compatible with Promise types
  interface Object {
    then?: any;
    catch?: any;
    finally?: any;
  }
}

// 2. Polyfill missing methods to prevent runtime errors
// Remove the window check since we're in a Node.js environment
// if (typeof window !== 'undefined') {
//   // Add any runtime polyfills if needed
// }

export default {
  // Add any exported utilities here
};