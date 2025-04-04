export declare const contactPaths: {
    '/contacts': {
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
    '/contacts/{id}': {
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
};
