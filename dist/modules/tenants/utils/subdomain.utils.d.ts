export declare class SubdomainUtils {
    private static readonly logger;
    /**
     * Generates a valid subdomain from an organization name
     * @param organizationName The name of the organization
     * @returns A valid subdomain string
     */
    static generateSubdomain(organizationName: string): string;
    /**
     * Validates if a subdomain is valid
     * @param subdomain The subdomain to validate
     * @returns boolean indicating if the subdomain is valid
     */
    static isValidSubdomain(subdomain: string): boolean;
}
