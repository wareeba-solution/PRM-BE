export function generateSlug(text, options = {}) {
    const { lowercase = true, separator = '-', removeStopWords = true, maxLength = 100 } = options;
    const stopWords = new Set([
        'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
        'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
        'that', 'the', 'to', 'was', 'were', 'will', 'with'
    ]);
    let slug = lowercase ? text.toLowerCase() : text;
    if (removeStopWords) {
        slug = slug
            .split(' ')
            .filter(word => !stopWords.has(word.toLowerCase()))
            .join(' ');
    }
    slug = slug
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, separator)
        .replace(new RegExp(`${separator}+`, 'g'), separator)
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
    if (maxLength && slug.length > maxLength) {
        const truncated = slug.substring(0, maxLength);
        const lastSeparator = truncated.lastIndexOf(separator);
        if (lastSeparator !== -1) {
            slug = truncated.substring(0, lastSeparator);
        }
        else {
            slug = truncated;
        }
    }
    return slug;
}
export function generateRandomString(length = 6) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
export function makeSlugUnique(slug, existingSlugs) {
    if (!existingSlugs.includes(slug)) {
        return slug;
    }
    let counter = 1;
    let uniqueSlug = slug;
    while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${slug}-${generateRandomString(4)}`;
        counter++;
    }
    return uniqueSlug;
}
export function isValidSlug(slug) {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
}
//# sourceMappingURL=slug.util.js.map