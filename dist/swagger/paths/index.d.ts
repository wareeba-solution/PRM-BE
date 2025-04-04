export declare function getAllPaths(): {
    '/contacts'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: ({
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    default: number;
                    enum?: undefined;
                };
            } | {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    default?: undefined;
                    enum?: undefined;
                };
            } | {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    enum: string[];
                    default?: undefined;
                };
            })[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
        post: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '201': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
    };
    '/contacts/{id}'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
        put: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
        delete: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '204': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
    };
    '/users'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: ({
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    default: number;
                };
            } | {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    default?: undefined;
                };
            })[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
        post: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '201': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
    };
    '/users/profile'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
        put: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
    };
    '/users/profile/password'?: {
        put: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
            };
        };
    };
    '/users/{id}'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
        put: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
        delete: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '204': {
                    description: string;
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
    };
    '/users/{id}/activate'?: {
        put: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
    };
    '/users/{id}/deactivate'?: {
        put: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
    };
    '/users/{id}/activity'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    activities: {
                                        type: string;
                                        items: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                action: {
                                                    type: string;
                                                };
                                                timestamp: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                    total: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
    };
    '/users/{id}/permissions'?: {
        get: {
            tags: string[];
            summary: string;
            security: {
                bearerAuth: any[];
            }[];
            parameters: {
                name: string;
                in: string;
                required: boolean;
                schema: {
                    type: string;
                    format: string;
                };
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '403': {
                    description: string;
                };
                '404': {
                    description: string;
                };
            };
        };
    };
    '/auth/login'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
                '429': {
                    description: string;
                };
            };
        };
    };
    '/auth/register'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '201': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
                '429': {
                    description: string;
                };
            };
        };
    };
    '/auth/refresh-token'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                properties: {
                                    tokens: {
                                        type: string;
                                        properties: {
                                            accessToken: {
                                                type: string;
                                            };
                                            refreshToken: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
            };
        };
    };
    '/auth/logout'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            security: {
                bearerAuth: any[];
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
            };
        };
    };
    '/auth/forgot-password'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
        };
    };
    '/auth/reset-password'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
            };
        };
    };
    '/auth/me'?: {
        get: {
            tags: string[];
            summary: string;
            operationId: string;
            security: {
                bearerAuth: any[];
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                properties: {
                                    user: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
            };
        };
    };
    '/auth/verify-email'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                        };
                    };
                };
            };
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '400': {
                    description: string;
                };
            };
        };
    };
    '/auth/resend-verification'?: {
        post: {
            tags: string[];
            summary: string;
            operationId: string;
            security: {
                bearerAuth: any[];
            }[];
            responses: {
                '200': {
                    description: string;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                '401': {
                    description: string;
                };
            };
        };
    };
};
