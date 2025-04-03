"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTypeProperties = exports.WhatsAppMediaType = void 0;
exports.isAllowedMimeType = isAllowedMimeType;
exports.isWithinSizeLimit = isWithinSizeLimit;
exports.validateImageDimensions = validateImageDimensions;
exports.validateLocationCoordinates = validateLocationCoordinates;
var WhatsAppMediaType;
(function (WhatsAppMediaType) {
    WhatsAppMediaType["IMAGE"] = "IMAGE";
    WhatsAppMediaType["VIDEO"] = "VIDEO";
    WhatsAppMediaType["AUDIO"] = "AUDIO";
    WhatsAppMediaType["DOCUMENT"] = "DOCUMENT";
    WhatsAppMediaType["STICKER"] = "STICKER";
    WhatsAppMediaType["CONTACT_CARD"] = "CONTACT_CARD";
    WhatsAppMediaType["CONTACT_CARD_MULTI"] = "CONTACT_CARD_MULTI";
    WhatsAppMediaType["LOCATION"] = "LOCATION";
})(WhatsAppMediaType || (exports.WhatsAppMediaType = WhatsAppMediaType = {}));
// Media type properties and constraints
exports.MediaTypeProperties = (_a = {},
    _a[WhatsAppMediaType.IMAGE] = {
        maxSizeBytes: 5 * 1024 * 1024, // 5MB
        allowedMimeTypes: [
            'image/jpeg',
            'image/png',
            'image/webp'
        ],
        maxDimensions: {
            width: 5000,
            height: 5000
        }
    },
    _a[WhatsAppMediaType.VIDEO] = {
        maxSizeBytes: 16 * 1024 * 1024, // 16MB
        allowedMimeTypes: [
            'video/mp4',
            'video/3gpp'
        ],
        maxDuration: 60 // seconds
    },
    _a[WhatsAppMediaType.AUDIO] = {
        maxSizeBytes: 16 * 1024 * 1024, // 16MB
        allowedMimeTypes: [
            'audio/aac',
            'audio/mp4',
            'audio/amr',
            'audio/mpeg',
            'audio/ogg'
        ]
    },
    _a[WhatsAppMediaType.DOCUMENT] = {
        maxSizeBytes: 100 * 1024 * 1024, // 100MB
        allowedMimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.ms-excel',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'application/zip',
            'application/x-rar-compressed'
        ]
    },
    _a[WhatsAppMediaType.STICKER] = {
        maxSizeBytes: 100 * 1024, // 100KB
        allowedMimeTypes: [
            'image/webp'
        ],
        dimensions: {
            width: 512,
            height: 512
        }
    },
    _a[WhatsAppMediaType.LOCATION] = {
        properties: {
            latitude: { min: -90, max: 90 },
            longitude: { min: -180, max: 180 }
        }
    },
    _a[WhatsAppMediaType.CONTACT_CARD] = undefined,
    _a[WhatsAppMediaType.CONTACT_CARD_MULTI] = undefined,
    _a);
// Helper function to check if mime type is allowed for media type
function isAllowedMimeType(mediaType, mimeType) {
    var properties = exports.MediaTypeProperties[mediaType];
    if (!properties || !properties.allowedMimeTypes) {
        return false;
    }
    return properties.allowedMimeTypes.includes(mimeType);
}
// Helper function to check if file size is within limits
function isWithinSizeLimit(mediaType, sizeInBytes) {
    var properties = exports.MediaTypeProperties[mediaType];
    if (!properties || !properties.maxSizeBytes) {
        return false;
    }
    return sizeInBytes <= properties.maxSizeBytes;
}
// Helper function to validate image dimensions
function validateImageDimensions(mediaType, width, height) {
    var properties = exports.MediaTypeProperties[mediaType];
    if (!properties || !properties.maxDimensions) {
        return true;
    }
    if (mediaType === WhatsAppMediaType.STICKER) {
        return width === properties.dimensions.width && height === properties.dimensions.height;
    }
    return width <= properties.maxDimensions.width && height <= properties.maxDimensions.height;
}
// Helper function to validate location coordinates
function validateLocationCoordinates(latitude, longitude) {
    var properties = exports.MediaTypeProperties[WhatsAppMediaType.LOCATION].properties;
    return (latitude >= properties.latitude.min &&
        latitude <= properties.latitude.max &&
        longitude >= properties.longitude.min &&
        longitude <= properties.longitude.max);
}
//# sourceMappingURL=whatsapp-media-type.enum.js.map