"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPaths = void 0;
exports.userPaths = {
    '/users': {
        get: {
            tags: ['Users'],
            summary: 'Get all users',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    required: false,
                    schema: { type: 'integer', default: 1 }
                },
                {
                    name: 'limit',
                    in: 'query',
                    required: false,
                    schema: { type: 'integer', default: 10 }
                },
                {
                    name: 'search',
                    in: 'query',
                    required: false,
                    schema: { type: 'string' }
                }
            ],
            responses: {
                '200': {
                    description: 'Return all users',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/SimpleUserDto'
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                }
            }
        },
        post: {
            tags: ['Users'],
            summary: 'Create new user',
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateUserDto'
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'User created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - validation failed'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                }
            }
        }
    },
    '/users/profile': {
        get: {
            tags: ['Users'],
            summary: 'Get current user profile',
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Return current user profile',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - Organization context required'
                }
            }
        },
        put: {
            tags: ['Users'],
            summary: 'Update current user profile',
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UpdateProfileDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Profile updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - validation failed'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - Organization context required'
                }
            }
        }
    },
    '/users/profile/password': {
        put: {
            tags: ['Users'],
            summary: 'Update current user password',
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UpdatePasswordDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Password updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - validation failed'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - Organization context required'
                }
            }
        }
    },
    '/users/{id}': {
        get: {
            tags: ['Users'],
            summary: 'Get user by ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            responses: {
                '200': {
                    description: 'Returns user details',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                },
                '404': {
                    description: 'User not found'
                }
            }
        },
        put: {
            tags: ['Users'],
            summary: 'Update user',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UpdateUserDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'User updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - validation failed or cannot demote last admin'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                },
                '404': {
                    description: 'User not found'
                }
            }
        },
        delete: {
            tags: ['Users'],
            summary: 'Delete user',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            responses: {
                '204': {
                    description: 'User deleted successfully'
                },
                '400': {
                    description: 'Bad Request - cannot delete last admin'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                },
                '404': {
                    description: 'User not found'
                }
            }
        }
    },
    '/users/{id}/activate': {
        put: {
            tags: ['Users'],
            summary: 'Activate user',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            responses: {
                '200': {
                    description: 'User activated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                },
                '404': {
                    description: 'User not found'
                }
            }
        }
    },
    '/users/{id}/deactivate': {
        put: {
            tags: ['Users'],
            summary: 'Deactivate user',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            responses: {
                '200': {
                    description: 'User deactivated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleUserDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - cannot deactivate last admin'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                },
                '404': {
                    description: 'User not found'
                }
            }
        }
    },
    '/users/{id}/activity': {
        get: {
            tags: ['Users'],
            summary: 'Get user activity',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            responses: {
                '200': {
                    description: 'Return user activity',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    activities: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                action: { type: 'string' },
                                                timestamp: { type: 'string', format: 'date-time' }
                                            }
                                        }
                                    },
                                    total: { type: 'number' }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - requires ADMIN role'
                },
                '404': {
                    description: 'User not found'
                }
            }
        }
    },
    '/users/{id}/permissions': {
        get: {
            tags: ['Users'],
            summary: 'Get user permissions',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string', format: 'uuid' }
                }
            ],
            responses: {
                '200': {
                    description: 'Return user permissions',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - Organization context required'
                },
                '404': {
                    description: 'User not found'
                }
            }
        }
    }
};
//# sourceMappingURL=user.path.js.map