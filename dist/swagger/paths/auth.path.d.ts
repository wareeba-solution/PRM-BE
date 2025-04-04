export declare const authPaths: {
    '/auth/login': {
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
    '/auth/register': {
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
    '/auth/refresh-token': {
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
    '/auth/logout': {
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
    '/auth/forgot-password': {
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
    '/auth/reset-password': {
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
    '/auth/me': {
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
    '/auth/verify-email': {
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
    '/auth/resend-verification': {
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
