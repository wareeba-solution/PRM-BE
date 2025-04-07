# Swagger and ReDoc Documentation

This directory contains Data Transfer Objects (DTOs) specifically designed for API documentation with Swagger and ReDoc.

## Why use separate DTOs for documentation?

As noted in our project history, we previously encountered circular dependency issues when using entity classes directly in Swagger documentation. These issues caused errors like:

```
Cannot read properties of undefined (reading 'values')
```

To solve this problem, we:

1. Created simplified DTOs specifically for documentation purposes
2. Configured Swagger with `deepScanRoutes: false` to prevent circular reference scanning
3. Added filtering for undefined models in the Swagger document

## How to use these DTOs

When documenting your API endpoints with Swagger decorators, use these DTOs instead of directly referencing entity classes:

```typescript
@ApiResponse({
  status: 200,
  description: 'User retrieved successfully',
  type: UserDto, // Use the DTO instead of User entity
})
```

## Adding new DTOs

When adding new DTOs for documentation:

1. Extend from BaseDto when appropriate
2. Only include properties needed for documentation
3. Use ApiProperty decorators with descriptive examples
4. Avoid circular references between DTOs
