"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPaths = void 0;
exports.authPaths = {
    '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'Login to the system',
            operationId: 'login',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/LoginDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/AuthResponseDto'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Invalid credentials'
                },
                '429': {
                    description: 'Too many requests, rate limit exceeded'
                }
            }
        }
    },
    '/auth/register': {
        post: {
            tags: ['Auth'],
            summary: 'Register new user/organization',
            operationId: 'register',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RegisterDto'
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Registration successful',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RegisterResponseDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Invalid input or email already in use'
                },
                '429': {
                    description: 'Too many requests, rate limit exceeded'
                }
            }
        }
    },
    '/auth/refresh-token': {
        post: {
            tags: ['Auth'],
            summary: 'Refresh access token',
            operationId: 'refreshToken',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RefreshTokenDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Token refreshed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                properties: {
                                    tokens: {
                                        type: 'object',
                                        properties: {
                                            accessToken: { type: 'string' },
                                            refreshToken: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Invalid refresh token'
                }
            }
        }
    },
    '/auth/logout': {
        post: {
            tags: ['Auth'],
            summary: 'User logout',
            operationId: 'logout',
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Logout successful',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MessageResponseDto'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                }
            }
        }
    },
    '/auth/forgot-password': {
        post: {
            tags: ['Auth'],
            summary: 'Request password reset',
            operationId: 'forgotPassword',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ForgotPasswordDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Password reset instructions sent to email',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MessageResponseDto'
                            }
                        }
                    }
                }
            }
        }
    },
    '/auth/reset-password': {
        post: {
            tags: ['Auth'],
            summary: 'Reset password',
            operationId: 'resetPassword',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ResetPasswordDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Password reset successful',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MessageResponseDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Invalid or expired token'
                }
            }
        }
    },
    '/auth/me': {
        get: {
            tags: ['Auth'],
            summary: 'Get current user information',
            operationId: 'getCurrentUser',
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Current user information',
                    content: {
                        'application/json': {
                            schema: {
                                properties: {
                                    user: {
                                        $ref: '#/components/schemas/SimpleUserDto'
                                    }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                }
            }
        }
    },
    '/auth/verify-email': {
        post: {
            tags: ['Auth'],
            summary: 'Verify email address',
            operationId: 'verifyEmail',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/VerifyEmailDto'
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Email verification successful',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MessageResponseDto'
                            }
                        }
                    }
                },
                '400': {
                    description: 'Invalid or expired token'
                }
            }
        }
    },
    '/auth/resend-verification': {
        post: {
            tags: ['Auth'],
            summary: 'Resend verification email',
            operationId: 'resendVerification',
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Verification email sent',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MessageResponseDto'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized'
                }
            }
        }
    }
};
//# sourceMappingURL=auth.path.js.map