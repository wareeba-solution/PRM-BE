// src/swagger/paths/index.ts
import { authPaths } from './auth.path';
import { userPaths } from './user.path';
import { contactPaths } from './contact.path';

export function getAllPaths() {
  console.log('Loading API paths...');

  // Safely check if objects exist before trying to access their keys
  const authPathsCount = authPaths ? Object.keys(authPaths).length : 0;
  const userPathsCount = userPaths ? Object.keys(userPaths).length : 0;
  const contactPathsCount = contactPaths ? Object.keys(contactPaths).length : 0;

  console.log('Auth paths:', authPathsCount);
  console.log('User paths:', userPathsCount);
  console.log('Contact paths:', contactPathsCount);

  const allPaths = {
    ...(authPaths || {}),
    ...(userPaths || {}),
    ...(contactPaths || {}),
  };

  console.log('Total paths loaded:', Object.keys(allPaths).length);
  return allPaths;
}