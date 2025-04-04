"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSchemas = void 0;
const auth_schema_1 = require("./auth.schema");
const user_schema_1 = require("./user.schema");
// Import other schema files as needed
function getAllSchemas() {
    console.log('Loading API schemas...');
    console.log('Auth schemas:', Object.keys(auth_schema_1.authSchemas).length);
    console.log('User schemas:', Object.keys(user_schema_1.userSchemas).length);
    const allSchemas = Object.assign(Object.assign(Object.assign({}, auth_schema_1.authSchemas), user_schema_1.userSchemas), { 
        // Important: Make sure SimpleOrganizationDto is included
        SimpleOrganizationDto: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
                name: { type: 'string', example: 'ACME Healthcare' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        } });
    console.log('Total schemas loaded:', Object.keys(allSchemas).length);
    return allSchemas;
}
exports.getAllSchemas = getAllSchemas;
//# sourceMappingURL=index.js.map