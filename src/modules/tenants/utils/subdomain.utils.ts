import { Logger } from '@nestjs/common';

export class SubdomainUtils {
  private static readonly logger = new Logger(SubdomainUtils.name);

  /**
   * Generates a valid subdomain from an organization name
   * @param organizationName The name of the organization
   * @returns A valid subdomain string
   */
  static generateSubdomain(organizationName: string): string {
    try {
      // Convert to lowercase
      let subdomain = organizationName.toLowerCase();

      // Remove special characters and replace spaces with hyphens
      subdomain = subdomain
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim(); // Remove leading/trailing spaces

      // Ensure the subdomain starts and ends with alphanumeric characters
      if (!/^[a-z0-9]/.test(subdomain)) {
        subdomain = 'org-' + subdomain;
      }
      if (!/[a-z0-9]$/.test(subdomain)) {
        subdomain = subdomain + '-org';
      }

      // Ensure the subdomain is not too long (max 63 characters as per DNS standards)
      if (subdomain.length > 63) {
        subdomain = subdomain.substring(0, 63);
        // Ensure it ends with alphanumeric
        if (!/[a-z0-9]$/.test(subdomain)) {
          subdomain = subdomain.substring(0, subdomain.length - 1) + '0';
        }
      }

      this.logger.debug(`Generated subdomain: ${subdomain} from organization name: ${organizationName}`);
      return subdomain;
    } catch (error) {
      this.logger.error(`Error generating subdomain from organization name: ${organizationName}`, error);
      throw new Error('Failed to generate subdomain from organization name');
    }
  }

  /**
   * Validates if a subdomain is valid
   * @param subdomain The subdomain to validate
   * @returns boolean indicating if the subdomain is valid
   */
  static isValidSubdomain(subdomain: string): boolean {
    // DNS subdomain rules:
    // - Must be 1-63 characters long
    // - Can only contain letters, numbers, and hyphens
    // - Must start and end with a letter or number
    // - Cannot contain consecutive hyphens
    const subdomainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
    return subdomain.length <= 63 && subdomainRegex.test(subdomain);
  }
} 