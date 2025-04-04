"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSchemas = void 0;
// src/swagger/schemas/index.ts
const auth_schema_1 = require("./auth.schema");
const user_schema_1 = require("./user.schema");
const contact_schema_1 = require("./contact.schema");
function getAllSchemas() {
    console.log('Loading API schemas...');
    // Safely check if objects exist before trying to access their keys
    const authSchemasCount = auth_schema_1.authSchemas ? Object.keys(auth_schema_1.authSchemas).length : 0;
    const userSchemasCount = user_schema_1.userSchemas ? Object.keys(user_schema_1.userSchemas).length : 0;
    const contactSchemasCount = contact_schema_1.contactSchemas ? Object.keys(contact_schema_1.contactSchemas).length : 0;
    console.log('Auth schemas:', authSchemasCount);
    console.log('User schemas:', userSchemasCount);
    console.log('Contact schemas:', contactSchemasCount);
    const allSchemas = Object.assign(Object.assign(Object.assign(Object.assign({}, (auth_schema_1.authSchemas || {})), (user_schema_1.userSchemas || {})), (contact_schema_1.contactSchemas || {})), { 
        // Important: Make sure SimpleOrganizationDto is included
        SimpleOrganizationDto: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
                name: { type: 'string', example: 'ACME Healthcare' },
                type: { type: 'string', example: 'HEALTHCARE' },
                status: { type: 'string', example: 'ACTIVE' }
            }
        } });
    console.log('Total schemas loaded:', Object.keys(allSchemas).length);
    return allSchemas;
}
exports.getAllSchemas = getAllSchemas;
//# sourceMappingURL=index.js.map