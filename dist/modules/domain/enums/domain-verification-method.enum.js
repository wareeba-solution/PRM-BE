"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainVerificationMethod = void 0;
/**
 * Represents the available methods for verifying domain ownership.
 * Each method provides a different way to prove domain control.
 */
var DomainVerificationMethod;
(function (DomainVerificationMethod) {
    /**
     * Verification via DNS TXT record
     * User adds a specific TXT record to domain's DNS settings
     */
    DomainVerificationMethod["DNS_TXT"] = "dns_txt";
    /**
     * Verification via DNS CNAME record
     * User adds a specific CNAME record to domain's DNS settings
     */
    DomainVerificationMethod["DNS_CNAME"] = "dns_cname";
    /**
     * Verification via HTML file
     * User uploads a specific HTML file to domain's root directory
     */
    DomainVerificationMethod["HTML_FILE"] = "html_file";
    /**
     * Verification via META tag
     * User adds a specific META tag to domain's homepage
     */
    DomainVerificationMethod["META_TAG"] = "meta_tag";
    /**
     * Verification via email
     * System sends verification email to domain admin contact
     */
    DomainVerificationMethod["EMAIL"] = "email";
    /**
     * Verification via Google Search Console
     * User verifies through Google Search Console integration
     */
    DomainVerificationMethod["GOOGLE_SEARCH_CONSOLE"] = "google_search_console";
    /**
     * Verification via domain registrar
     * Direct verification through domain registrar API
     */
    DomainVerificationMethod["REGISTRAR"] = "registrar";
    /**
     * Verification via HTTPS certificate
     * User proves control via SSL/TLS certificate ownership
     */
    DomainVerificationMethod["HTTPS"] = "https";
    /**
     * Verification via website redirect
     * User configures specific redirect on domain
     */
    DomainVerificationMethod["REDIRECT"] = "redirect";
    /**
     * Verification via domain contact
     * Manual verification through domain contact information
     */
    DomainVerificationMethod["CONTACT"] = "contact";
    /**
     * Verification via third-party service
     * Verification through integrated third-party service
     */
    DomainVerificationMethod["THIRD_PARTY"] = "third_party";
    /**
     * Verification via DNS CAA record
     * User adds specific CAA record to domain's DNS settings
     */
    DomainVerificationMethod["DNS_CAA"] = "dns_caa";
    /**
     * Verification via manual review
     * Administrator manually verifies domain ownership
     */
    DomainVerificationMethod["MANUAL"] = "manual";
    /**
     * Verification via domain transfer
     * User transfers domain to prove ownership
     */
    DomainVerificationMethod["DOMAIN_TRANSFER"] = "domain_transfer";
    /**
     * Verification via DNS delegation
     * User delegates DNS management to prove control
     */
    DomainVerificationMethod["DNS_DELEGATION"] = "dns_delegation";
    /**
     * Verification via API token
     * User proves ownership through API-based verification
     */
    DomainVerificationMethod["API_TOKEN"] = "api_token";
    /**
     * Verification via domain hosting
     * Direct verification through hosting provider
     */
    DomainVerificationMethod["HOSTING_PROVIDER"] = "hosting_provider";
    /**
     * Verification via webhook
     * User configures webhook endpoint for verification
     */
    DomainVerificationMethod["WEBHOOK"] = "webhook";
    /**
     * Combined verification using multiple methods
     * Requires successful verification through multiple methods
     */
    DomainVerificationMethod["MULTI_METHOD"] = "multi_method";
    DomainVerificationMethod["FILE"] = "FILE";
})(DomainVerificationMethod || (exports.DomainVerificationMethod = DomainVerificationMethod = {}));
//# sourceMappingURL=domain-verification-method.enum.js.map