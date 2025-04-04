import { authSchemas } from './auth.schema';
import { userSchemas } from './user.schema';
// Import other schema files as needed

export function getAllSchemas() {
  console.log('Loading API schemas...');
  console.log('Auth schemas:', Object.keys(authSchemas).length);
  console.log('User schemas:', Object.keys(userSchemas).length);

  const allSchemas = {
    ...authSchemas,
    ...userSchemas,
    // Important: Make sure SimpleOrganizationDto is included
    SimpleOrganizationDto: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
        name: { type: 'string', example: 'ACME Healthcare' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    },
    // Add other schemas as needed
  };

  console.log('Total schemas loaded:', Object.keys(allSchemas).length);
  return allSchemas;
}