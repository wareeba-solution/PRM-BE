// src/swagger/paths/contact.path.ts
export const contactPaths = {
    '/contacts': {
        get: {
            tags: ['Contacts'],
            summary: 'Get all contacts',
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
                },
                {
                    name: 'type',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'string',
                        enum: ['PATIENT', 'EMERGENCY_CONTACT', 'FAMILY_MEMBER', 'OTHER']
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Return all contacts',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/SimpleContactDto'
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
                }
            }
        },
        post: {
            tags: ['Contacts'],
            summary: 'Create new contact',
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateContactDto'
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Contact created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleContactDto'
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
    '/contacts/{id}': {
        get: {
            tags: ['Contacts'],
            summary: 'Get contact by ID',
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
                    description: 'Returns contact details',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleContactDto'
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
                    description: 'Contact not found'
                }
            }
        },
        put: {
            tags: ['Contacts'],
            summary: 'Update contact',
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
                            $ref: '#/components/schemas/UpdateContactDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Contact updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SimpleContactDto'
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
                },
                '404': {
                    description: 'Contact not found'
                }
            }
        },
        delete: {
            tags: ['Contacts'],
            summary: 'Delete contact',
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
                    description: 'Contact deleted successfully'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    description: 'Forbidden - Organization context required'
                },
                '404': {
                    description: 'Contact not found'
                }
            }
        }
    }
};