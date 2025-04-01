export var EmailStatus;
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
})(EmailStatus || (EmailStatus = {}));
export var DomainVerificationStatus;
(function (DomainVerificationStatus) {
    DomainVerificationStatus["PENDING"] = "PENDING";
    DomainVerificationStatus["VERIFIED"] = "VERIFIED";
    DomainVerificationStatus["FAILED"] = "FAILED";
    DomainVerificationStatus["EXPIRED"] = "EXPIRED";
})(DomainVerificationStatus || (DomainVerificationStatus = {}));
//# sourceMappingURL=email-status.enum.js.map