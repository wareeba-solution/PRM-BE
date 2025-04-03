/**
 * Utility functions for generating URL-friendly slugs
 */
/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @param options - Optional configuration for slug generation
 * @returns The generated slug
 */
export declare function generateSlug(text: string, options?: {
    lowercase?: boolean;
    separator?: string;
    removeStopWords?: boolean;
    maxLength?: number;
}): string;
/**
 * Generates a random string to be appended to a slug to ensure uniqueness
 * @param length - Length of the random string
 * @returns Random string
 */
export declare function generateRandomString(length?: number): string;
/**
 * Makes a slug unique by appending a random string or number
 * @param slug - Original slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns Unique slug
 */
export declare function makeSlugUnique(slug: string, existingSlugs: string[]): string;
/**
 * Validates if a string is a valid slug
 * @param slug - Slug to validate
 * @returns Boolean indicating if slug is valid
 */
export declare function isValidSlug(slug: string): boolean;
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
