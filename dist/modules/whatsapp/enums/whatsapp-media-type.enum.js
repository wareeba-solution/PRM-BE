export var WhatsAppMediaType;
(function (WhatsAppMediaType) {
    WhatsAppMediaType["IMAGE"] = "IMAGE";
    WhatsAppMediaType["VIDEO"] = "VIDEO";
    WhatsAppMediaType["AUDIO"] = "AUDIO";
    WhatsAppMediaType["DOCUMENT"] = "DOCUMENT";
    WhatsAppMediaType["STICKER"] = "STICKER";
    WhatsAppMediaType["CONTACT_CARD"] = "CONTACT_CARD";
    WhatsAppMediaType["CONTACT_CARD_MULTI"] = "CONTACT_CARD_MULTI";
    WhatsAppMediaType["LOCATION"] = "LOCATION";
})(WhatsAppMediaType || (WhatsAppMediaType = {}));
export const MediaTypeProperties = {
    [WhatsAppMediaType.IMAGE]: {
        maxSizeBytes: 5 * 1024 * 1024,
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
    [WhatsAppMediaType.VIDEO]: {
        maxSizeBytes: 16 * 1024 * 1024,
        allowedMimeTypes: [
            'video/mp4',
            'video/3gpp'
        ],
        maxDuration: 60
    },
    [WhatsAppMediaType.AUDIO]: {
        maxSizeBytes: 16 * 1024 * 1024,
        allowedMimeTypes: [
            'audio/aac',
            'audio/mp4',
            'audio/amr',
            'audio/mpeg',
            'audio/ogg'
        ]
    },
    [WhatsAppMediaType.DOCUMENT]: {
        maxSizeBytes: 100 * 1024 * 1024,
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
    [WhatsAppMediaType.STICKER]: {
        maxSizeBytes: 100 * 1024,
        allowedMimeTypes: [
            'image/webp'
        ],
        dimensions: {
            width: 512,
            height: 512
        }
    },
    [WhatsAppMediaType.LOCATION]: {
        properties: {
            latitude: { min: -90, max: 90 },
            longitude: { min: -180, max: 180 }
        }
    },
    [WhatsAppMediaType.CONTACT_CARD]: undefined,
    [WhatsAppMediaType.CONTACT_CARD_MULTI]: undefined
};
export function isAllowedMimeType(mediaType, mimeType) {
    const properties = MediaTypeProperties[mediaType];
    if (!properties || !properties.allowedMimeTypes) {
        return false;
    }
    return properties.allowedMimeTypes.includes(mimeType);
}
export function isWithinSizeLimit(mediaType, sizeInBytes) {
    const properties = MediaTypeProperties[mediaType];
    if (!properties || !properties.maxSizeBytes) {
        return false;
    }
    return sizeInBytes <= properties.maxSizeBytes;
}
export function validateImageDimensions(mediaType, width, height) {
    const properties = MediaTypeProperties[mediaType];
    if (!properties || !properties.maxDimensions) {
        return true;
    }
    if (mediaType === WhatsAppMediaType.STICKER) {
        return width === properties.dimensions.width && height === properties.dimensions.height;
    }
    return width <= properties.maxDimensions.width && height <= properties.maxDimensions.height;
}
export function validateLocationCoordinates(latitude, longitude) {
    const properties = MediaTypeProperties[WhatsAppMediaType.LOCATION].properties;
    return (latitude >= properties.latitude.min &&
        latitude <= properties.latitude.max &&
        longitude >= properties.longitude.min &&
        longitude <= properties.longitude.max);
}
//# sourceMappingURL=whatsapp-media-type.enum.js.map