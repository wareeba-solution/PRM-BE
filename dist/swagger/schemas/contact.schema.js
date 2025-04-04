"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchemas = void 0;
// src/swagger/schemas/contact.schema.ts
exports.contactSchemas = {
    SimpleContactDto: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'contact@example.com' },
            phoneNumber: { type: 'string', example: '+1234567890' },
            type: {
                type: 'string',
                enum: ['PATIENT', 'EMERGENCY_CONTACT', 'FAMILY_MEMBER', 'OTHER'],
                example: 'PATIENT'
            }
        }
    },
    CreateContactDto: {
        type: 'object',
        properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'contact@example.com' },
            phoneNumber: { type: 'string', example: '+1234567890' },
            type: {
                type: 'string',
                enum: ['PATIENT', 'EMERGENCY_CONTACT', 'FAMILY_MEMBER', 'OTHER'],
                example: 'PATIENT'
            },
            organizationId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' }
        },
        required: ['firstName', 'lastName', 'type', 'organizationId']
    },
    UpdateContactDto: {
        type: 'object',
        properties: {
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'contact@example.com' },
            phoneNumber: { type: 'string', example: '+1234567890' },
            type: {
                type: 'string',
                enum: ['PATIENT', 'EMERGENCY_CONTACT', 'FAMILY_MEMBER', 'OTHER'],
                example: 'PATIENT'
            }
        }
    }
};
//# sourceMappingURL=contact.schema.js.map