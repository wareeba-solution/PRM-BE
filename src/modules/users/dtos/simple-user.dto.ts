// src/modules/users/dtos/simple-user.dto.ts

/**
 * Simplified User DTO for API responses
 * This provides a clean representation of user data
 */
export class SimpleUserDto {
  id: string;
  
  email: string;
  
  firstName: string;
  
  lastName: string;
  
  role: string;
  
  isActive: boolean;
  
  createdAt: Date;
}
