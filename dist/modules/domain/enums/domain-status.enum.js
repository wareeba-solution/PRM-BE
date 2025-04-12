"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainStatus = void 0;
/**
 * Represents the possible statuses for a domain.
 * Tracks the domain's lifecycle from registration through various states.
 */
var DomainStatus;
(function (DomainStatus) {
    /**
     * Domain is newly added but not fully configured
     */
    DomainStatus["PENDING"] = "pending";
    /**
     * Domain is active and functioning normally
     */
    DomainStatus["ACTIVE"] = "active";
    /**
     * Domain is suspended due to compliance or policy issues
     */
    DomainStatus["SUSPENDED"] = "suspended";
    /**
     * Domain has expired but is within grace period
     */
    DomainStatus["EXPIRED"] = "expired";
    /**
     * Domain has expired and is in redemption period
     */
    DomainStatus["REDEMPTION"] = "redemption";
    /**
     * Domain pending deletion after redemption period
     */
    DomainStatus["PENDING_DELETE"] = "pending_delete";
    /**
     * Domain registration is being transferred
     */
    DomainStatus["TRANSFER_IN_PROGRESS"] = "transfer_in_progress";
    /**
     * Domain transfer has been initiated but needs approval
     */
    DomainStatus["TRANSFER_PENDING"] = "transfer_pending";
    /**
     * Domain is locked and cannot be modified
     */
    DomainStatus["LOCKED"] = "locked";
    /**
     * Domain is under legal dispute
     */
    DomainStatus["DISPUTED"] = "disputed";
    /**
     * Domain configuration is incomplete
     */
    DomainStatus["INCOMPLETE"] = "incomplete";
    /**
     * Domain is undergoing maintenance
     */
    DomainStatus["MAINTENANCE"] = "maintenance";
    /**
     * Domain has failed automated checks
     */
    DomainStatus["FAILED"] = "failed";
    /**
     * Domain requires manual review
     */
    DomainStatus["REVIEW_REQUIRED"] = "review_required";
    /**
     * Domain is reserved but not yet active
     */
    DomainStatus["RESERVED"] = "reserved";
    /**
     * Domain registration is processing
     */
    DomainStatus["REGISTERING"] = "registering";
    /**
     * Domain is blocked from registration
     */
    DomainStatus["BLOCKED"] = "blocked";
    /**
     * Domain has invalid configuration
     */
    DomainStatus["INVALID"] = "invalid";
    /**
     * Domain is archived and inactive
     */
    DomainStatus["ARCHIVED"] = "archived";
    /**
     * Domain deletion is scheduled
     */
    DomainStatus["PENDING_REMOVAL"] = "pending_removal";
    /**
     * Domain ownership is being verified
     */
    DomainStatus["VERIFYING"] = "verifying";
    /**
     * Domain has DNS configuration issues
     */
    DomainStatus["DNS_INVALID"] = "dns_invalid";
    /**
     * Domain requires renewal action
     */
    DomainStatus["RENEWAL_REQUIRED"] = "renewal_required";
    /**
     * Domain has active security issues
     */
    DomainStatus["SECURITY_HOLD"] = "security_hold";
    /**
     * Domain registrar update in progress
     */
    DomainStatus["REGISTRAR_UPDATE"] = "registrar_update";
    /**
     * Domain requires configuration update
     */
    DomainStatus["UPDATE_REQUIRED"] = "update_required";
    /**
     * Domain grace period after registration
     */
    DomainStatus["GRACE_PERIOD"] = "grace_period";
    /**
     * Domain is active but has warnings
     */
    DomainStatus["WARNING"] = "warning";
    /**
     * Domain has been deleted
     */
    DomainStatus["DELETED"] = "deleted";
})(DomainStatus = exports.DomainStatus || (exports.DomainStatus = {}));
//# sourceMappingURL=domain-status.enum.js.map