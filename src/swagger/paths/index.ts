import { authPaths } from './auth.path';
import { userPaths } from './user.path';
// Import other path files as needed

export function getAllPaths() {
  console.log('Loading API paths...');
  console.log('Auth paths:', Object.keys(authPaths).length);
  console.log('User paths:', Object.keys(userPaths).length);

  const allPaths = {
    ...authPaths,
    ...userPaths,
    // Add other paths as needed
  };

  console.log('Total paths loaded:', Object.keys(allPaths).length);
  return allPaths;
}