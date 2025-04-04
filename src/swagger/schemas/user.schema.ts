// src/swagger/schemas/user.schema.ts

export const userSchemas = {
  CreateUserDto: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email', example: 'user@example.com' },
      password: { type: 'string', format: 'password', example: 'SecurePassword123!' },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      role: { type: 'string', enum: ['ADMIN', 'USER', 'DOCTOR'], example: 'USER' },
      organizationId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' }
    },
    required: ['email', 'password', 'firstName', 'lastName', 'role', 'organizationId']
  },
  UpdateUserDto: {
    type: 'object',
    properties: {
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      role: { type: 'string', enum: ['ADMIN', 'USER', 'DOCTOR'], example: 'USER' },
      isActive: { type: 'boolean', example: true }
    }
  },
  UpdateProfileDto: {
    type: 'object',
    properties: {
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      phone: { type: 'string', example: '+1234567890' },
      avatar: { type: 'string', example: 'https://example.com/avatar.jpg' }
    }
  },
  UpdatePasswordDto: {
    type: 'object',
    properties: {
      currentPassword: { type: 'string', format: 'password', example: 'CurrentPassword123!' },
      newPassword: { type: 'string', format: 'password', example: 'NewPassword123!' }
    },
    required: ['currentPassword', 'newPassword']
  },
  UserResponseDto: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
      email: { type: 'string', format: 'email', example: 'user@example.com' },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      role: { type: 'string', example: 'USER' },
      isActive: { type: 'boolean', example: true },
      isVerified: { type: 'boolean', example: true },
      phone: { type: 'string', example: '+1234567890' },
      avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      organizations: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            role: { type: 'string' }
          }
        }
      }
    }
  },
  SimpleUserDto: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
      email: { type: 'string', format: 'email', example: 'user@example.com' },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'Doe' },
      role: { type: 'string', example: 'USER' },
      isActive: { type: 'boolean', example: true }
    }
  },
  UserActivityDto: {
    type: 'object',
    properties: {
      activities: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
            action: { type: 'string', example: 'LOGIN' },
            details: { type: 'string', example: 'User logged in from 192.168.1.1' },
            userAgent: { type: 'string', example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...' },
            ip: { type: 'string', example: '192.168.1.1' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }
      },
      total: { type: 'number', example: 42 }
    }
  },
  UserPermissionsDto: {
    type: 'array',
    items: {
      type: 'string',
      example: 'CREATE_USER'
    }
  },
  UserListResponseDto: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/SimpleUserDto'
        }
      },
      meta: {
        type: 'object',
        properties: {
          totalItems: { type: 'integer', example: 42 },
          itemCount: { type: 'integer', example: 10 },
          itemsPerPage: { type: 'integer', example: 10 },
          totalPages: { type: 'integer', example: 5 },
          currentPage: { type: 'integer', example: 1 }
        }
      }
    }
  }
};