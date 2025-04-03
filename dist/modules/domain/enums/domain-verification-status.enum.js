"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainVerificationStatus = void 0;
/**
 * Represents the possible verification statuses for a domain.
 * Used to track the state of domain ownership verification.
 */
var DomainVerificationStatus;
(function (DomainVerificationStatus) {
    /**
     * Verification process has not been initiated
     */
    DomainVerificationStatus["UNVERIFIED"] = "unverified";
    /**
     * Verification process has been initiated but not completed
     */
    DomainVerificationStatus["PENDING"] = "pending";
    /**
     * Verification is in progress (e.g., DNS propagation)
     */
    DomainVerificationStatus["IN_PROGRESS"] = "in_progress";
    /**
     * Domain has been successfully verified
     */
    DomainVerificationStatus["VERIFIED"] = "verified";
    /**
     * Verification attempt failed
     */
    DomainVerificationStatus["FAILED"] = "failed";
    /**
     * Verification has expired and needs to be re-initiated
     */
    DomainVerificationStatus["EXPIRED"] = "expired";
    /**
     * Verification process was cancelled by the user
     */
    DomainVerificationStatus["CANCELLED"] = "cancelled";
    /**
     * Verification is temporarily suspended
     */
    DomainVerificationStatus["SUSPENDED"] = "suspended";
    /**
     * Verification requires action from the user
     */
    DomainVerificationStatus["ACTION_REQUIRED"] = "action_required";
    /**
     * Previous verification has been invalidated
     */
    DomainVerificationStatus["INVALIDATED"] = "invalidated";
    /**
     * Verification is being retried after a failure
     */
    DomainVerificationStatus["RETRYING"] = "retrying";
    /**
     * Domain has changed and requires re-verification
     */
    DomainVerificationStatus["REQUIRES_REVERIFICATION"] = "requires_reverification";
    /**
     * Verification is blocked due to policy or security concerns
     */
    DomainVerificationStatus["BLOCKED"] = "blocked";
    /**
     * Verification record exists but hasn't been checked yet
     */
    DomainVerificationStatus["UNCHECKED"] = "unchecked";
    /**
     * Verification is waiting for external service response
     */
    DomainVerificationStatus["AWAITING_RESPONSE"] = "awaiting_response";
    /**
     * Verification succeeded but with warnings
     */
    DomainVerificationStatus["VERIFIED_WITH_WARNINGS"] = "verified_with_warnings";
})(DomainVerificationStatus || (exports.DomainVerificationStatus = DomainVerificationStatus = {}));
//# sourceMappingURL=domain-verification-status.enum.js.map