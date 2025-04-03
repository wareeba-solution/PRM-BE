"use strict";
/**
 * Utility functions for generating URL-friendly slugs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
exports.generateRandomString = generateRandomString;
exports.makeSlugUnique = makeSlugUnique;
exports.isValidSlug = isValidSlug;
/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @param options - Optional configuration for slug generation
 * @returns The generated slug
 */
function generateSlug(text, options) {
    if (options === void 0) { options = {}; }
    var _a = options.lowercase, lowercase = _a === void 0 ? true : _a, _b = options.separator, separator = _b === void 0 ? '-' : _b, _c = options.removeStopWords, removeStopWords = _c === void 0 ? true : _c, _d = options.maxLength, maxLength = _d === void 0 ? 100 : _d;
    // List of common stop words to remove if removeStopWords is true
    var stopWords = new Set([
        'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
        'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
        'that', 'the', 'to', 'was', 'were', 'will', 'with'
    ]);
    // Convert to lowercase if specified
    var slug = lowercase ? text.toLowerCase() : text;
    // Remove stop words if specified
    if (removeStopWords) {
        slug = slug
            .split(' ')
            .filter(function (word) { return !stopWords.has(word.toLowerCase()); })
            .join(' ');
    }
    // Replace spaces and unwanted characters
    slug = slug
        // Replace special characters with their simple equivalents
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Remove special characters and replace with separator
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        // Replace multiple spaces with single separator
        .replace(/\s+/g, separator)
        // Replace multiple separators with single separator
        .replace(new RegExp("".concat(separator, "+"), 'g'), separator)
        // Remove separator from start and end
        .replace(new RegExp("^".concat(separator, "+|").concat(separator, "+$"), 'g'), '');
    // Truncate to maximum length while avoiding cutting words
    if (maxLength && slug.length > maxLength) {
        var truncated = slug.substring(0, maxLength);
        // Find the last separator in the truncated string
        var lastSeparator = truncated.lastIndexOf(separator);
        if (lastSeparator !== -1) {
            slug = truncated.substring(0, lastSeparator);
        }
        else {
            slug = truncated;
        }
    }
    return slug;
}
/**
 * Generates a random string to be appended to a slug to ensure uniqueness
 * @param length - Length of the random string
 * @returns Random string
 */
function generateRandomString(length) {
    if (length === void 0) { length = 6; }
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
/**
 * Makes a slug unique by appending a random string or number
 * @param slug - Original slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
function makeSlugUnique(slug, existingSlugs) {
    if (!existingSlugs.includes(slug)) {
        return slug;
    }
    var counter = 1;
    var uniqueSlug = slug;
    while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = "".concat(slug, "-").concat(generateRandomString(4));
        counter++;
    }
    return uniqueSlug;
}
/**
 * Validates if a string is a valid slug
 * @param slug - Slug to validate
 * @returns Boolean indicating if slug is valid
 */
function isValidSlug(slug) {
    var slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
}
/**
 * Example usage:
 *
 * const text = "This is a Sample Title! With Special Characters & Spaces";
 * const slug = generateSlug(text);
 * // Output: "this-is-sample-title-with-special-characters-spaces"
 *
 * const uniqueSlug = makeSlugUnique(slug, existingSlugs);
 * // Output: "this-is-sample-title-with-special-characters-spaces-x7p2"
 */ 
//# sourceMappingURL=slug.util.js.map