"use strict";
// src/modules/whatsapp/enums/whatsapp-template.enums.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappTemplateButtonType = exports.WhatsappTemplateHeaderType = exports.WhatsappTemplateComponentType = exports.WhatsappTemplateCategory = exports.WhatsappTemplateStatus = void 0;
/**
 * Whatsapp template status enum
 */
var WhatsappTemplateStatus;
(function (WhatsappTemplateStatus) {
    WhatsappTemplateStatus["DRAFT"] = "draft";
    WhatsappTemplateStatus["PENDING_APPROVAL"] = "pending_approval";
    WhatsappTemplateStatus["APPROVED"] = "approved";
    WhatsappTemplateStatus["REJECTED"] = "rejected";
    WhatsappTemplateStatus["ACTIVE"] = "active";
    WhatsappTemplateStatus["INACTIVE"] = "inactive";
    WhatsappTemplateStatus["DELETED"] = "deleted";
})(WhatsappTemplateStatus || (exports.WhatsappTemplateStatus = WhatsappTemplateStatus = {}));
/**
 * Whatsapp template category enum
 */
var WhatsappTemplateCategory;
(function (WhatsappTemplateCategory) {
    WhatsappTemplateCategory["ACCOUNT_UPDATE"] = "account_update";
    WhatsappTemplateCategory["PAYMENT_UPDATE"] = "payment_update";
    WhatsappTemplateCategory["PERSONAL_FINANCE_UPDATE"] = "personal_finance_update";
    WhatsappTemplateCategory["SHIPPING_UPDATE"] = "shipping_update";
    WhatsappTemplateCategory["RESERVATION_UPDATE"] = "reservation_update";
    WhatsappTemplateCategory["ISSUE_RESOLUTION"] = "issue_resolution";
    WhatsappTemplateCategory["APPOINTMENT_UPDATE"] = "appointment_update";
    WhatsappTemplateCategory["TRANSPORTATION_UPDATE"] = "transportation_update";
    WhatsappTemplateCategory["TICKET_UPDATE"] = "ticket_update";
    WhatsappTemplateCategory["ALERT_UPDATE"] = "alert_update";
    WhatsappTemplateCategory["AUTO_REPLY"] = "auto_reply";
    WhatsappTemplateCategory["TRANSACTIONAL"] = "transactional";
    WhatsappTemplateCategory["MARKETING"] = "marketing";
    WhatsappTemplateCategory["UTILITY"] = "utility";
    WhatsappTemplateCategory["AUTHENTICATION"] = "authentication";
})(WhatsappTemplateCategory || (exports.WhatsappTemplateCategory = WhatsappTemplateCategory = {}));
/**
 * Whatsapp template component type enum
 */
var WhatsappTemplateComponentType;
(function (WhatsappTemplateComponentType) {
    WhatsappTemplateComponentType["HEADER"] = "header";
    WhatsappTemplateComponentType["BODY"] = "body";
    WhatsappTemplateComponentType["FOOTER"] = "footer";
    WhatsappTemplateComponentType["BUTTONS"] = "buttons";
})(WhatsappTemplateComponentType || (exports.WhatsappTemplateComponentType = WhatsappTemplateComponentType = {}));
/**
 * Whatsapp template header type enum
 */
var WhatsappTemplateHeaderType;
(function (WhatsappTemplateHeaderType) {
    WhatsappTemplateHeaderType["TEXT"] = "text";
    WhatsappTemplateHeaderType["IMAGE"] = "image";
    WhatsappTemplateHeaderType["VIDEO"] = "video";
    WhatsappTemplateHeaderType["DOCUMENT"] = "document";
    WhatsappTemplateHeaderType["LOCATION"] = "location";
})(WhatsappTemplateHeaderType || (exports.WhatsappTemplateHeaderType = WhatsappTemplateHeaderType = {}));
/**
 * Whatsapp template button type enum
 */
var WhatsappTemplateButtonType;
(function (WhatsappTemplateButtonType) {
    WhatsappTemplateButtonType["PHONE_NUMBER"] = "phone_number";
    WhatsappTemplateButtonType["URL"] = "url";
    WhatsappTemplateButtonType["QUICK_REPLY"] = "quick_reply";
})(WhatsappTemplateButtonType || (exports.WhatsappTemplateButtonType = WhatsappTemplateButtonType = {}));
//# sourceMappingURL=whatsapp-template.enums.js.map