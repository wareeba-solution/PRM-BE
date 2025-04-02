import { userSchemas } from './user.schema.js';
import { authSchemas } from './auth.schema.js';

export function getAllSchemas() {
  return {
    ...userSchemas,
    ...authSchemas,
  };
}