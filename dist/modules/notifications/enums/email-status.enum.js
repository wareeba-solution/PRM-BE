"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainVerificationStatus = exports.EmailStatus = void 0;
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["PENDING"] = "PENDING";
    EmailStatus["SENDING"] = "SENDING";
    EmailStatus["SENT"] = "SENT";
    EmailStatus["FAILED"] = "FAILED";
    EmailStatus["DELIVERED"] = "DELIVERED";
    EmailStatus["OPENED"] = "OPENED";
    EmailStatus["CLICKED"] = "CLICKED";
    EmailStatus["BOUNCED"] = "BOUNCED";
    EmailStatus["SPAM"] = "SPAM";
    EmailStatus["UNSUBSCRIBED"] = "UNSUBSCRIBED";
    EmailStatus["QUEUED"] = "QUEUED";
})(EmailStatus || (exports.EmailStatus = EmailStatus = {}));
var DomainVerificationStatus;
(function (DomainVerificationStatus) {
    DomainVerificationStatus["PENDING"] = "PENDING";
    DomainVerificationStatus["VERIFIED"] = "VERIFIED";
    DomainVerificationStatus["FAILED"] = "FAILED";
    DomainVerificationStatus["EXPIRED"] = "EXPIRED";
})(DomainVerificationStatus || (exports.DomainVerificationStatus = DomainVerificationStatus = {}));
//# sourceMappingURL=email-status.enum.js.map