// src/swagger/schemas/index.ts
import { authSchemas } from './auth.schema';
import { userSchemas } from './user.schema';
import { contactSchemas } from './contact.schema';

export function getAllSchemas() {
  console.log('Loading API schemas...');

  // Safely check if objects exist before trying to access their keys
  const authSchemasCount = authSchemas ? Object.keys(authSchemas).length : 0;
  const userSchemasCount = userSchemas ? Object.keys(userSchemas).length : 0;
  const contactSchemasCount = contactSchemas ? Object.keys(contactSchemas).length : 0;

  console.log('Auth schemas:', authSchemasCount);
  console.log('User schemas:', userSchemasCount);
  console.log('Contact schemas:', contactSchemasCount);

  const allSchemas = {
    ...(authSchemas || {}),
    ...(userSchemas || {}),
    ...(contactSchemas || {}),
    // Important: Make sure SimpleOrganizationDto is included
    SimpleOrganizationDto: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
        name: { type: 'string', example: 'ACME Healthcare' },
        type: { type: 'string', example: 'HEALTHCARE' },
        status: { type: 'string', example: 'ACTIVE' }
      }
    },
  };

  console.log('Total schemas loaded:', Object.keys(allSchemas).length);
  return allSchemas;
}