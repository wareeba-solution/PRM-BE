export declare function getAllSchemas(): {
    SimpleOrganizationDto: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                example: string;
            };
            name: {
                type: string;
                example: string;
            };
            type: {
                type: string;
                example: string;
            };
            status: {
                type: string;
                example: string;
            };
        };
    };
    SimpleContactDto?: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                example: string;
            };
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            email: {
                type: string;
                format: string;
                example: string;
            };
            phoneNumber: {
                type: string;
                example: string;
            };
            type: {
                type: string;
                enum: string[];
                example: string;
            };
        };
    };
    CreateContactDto?: {
        type: string;
        properties: {
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            email: {
                type: string;
                format: string;
                example: string;
            };
            phoneNumber: {
                type: string;
                example: string;
            };
            type: {
                type: string;
                enum: string[];
                example: string;
            };
            organizationId: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    UpdateContactDto?: {
        type: string;
        properties: {
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            email: {
                type: string;
                format: string;
                example: string;
            };
            phoneNumber: {
                type: string;
                example: string;
            };
            type: {
                type: string;
                enum: string[];
                example: string;
            };
        };
    };
    CreateUserDto?: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            role: {
                type: string;
                enum: string[];
                example: string;
            };
            organizationId: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    UpdateUserDto?: {
        type: string;
        properties: {
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            role: {
                type: string;
                enum: string[];
                example: string;
            };
            isActive: {
                type: string;
                example: boolean;
            };
        };
    };
    UpdateProfileDto?: {
        type: string;
        properties: {
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            phone: {
                type: string;
                example: string;
            };
            avatar: {
                type: string;
                example: string;
            };
        };
    };
    UpdatePasswordDto?: {
        type: string;
        properties: {
            currentPassword: {
                type: string;
                format: string;
                example: string;
            };
            newPassword: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    UserResponseDto?: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                example: string;
            };
            email: {
                type: string;
                format: string;
                example: string;
            };
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            role: {
                type: string;
                example: string;
            };
            isActive: {
                type: string;
                example: boolean;
            };
            isVerified: {
                type: string;
                example: boolean;
            };
            phone: {
                type: string;
                example: string;
            };
            avatar: {
                type: string;
                example: string;
            };
            createdAt: {
                type: string;
                format: string;
            };
            updatedAt: {
                type: string;
                format: string;
            };
            organizations: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            format: string;
                        };
                        name: {
                            type: string;
                        };
                        role: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
    SimpleUserDto?: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                example: string;
            };
            email: {
                type: string;
                format: string;
                example: string;
            };
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            role: {
                type: string;
                example: string;
            };
            isActive: {
                type: string;
                example: boolean;
            };
        };
    };
    UserActivityDto?: {
        type: string;
        properties: {
            activities: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            format: string;
                            example: string;
                        };
                        action: {
                            type: string;
                            example: string;
                        };
                        details: {
                            type: string;
                            example: string;
                        };
                        userAgent: {
                            type: string;
                            example: string;
                        };
                        ip: {
                            type: string;
                            example: string;
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
                example: number;
            };
        };
    };
    UserPermissionsDto?: {
        type: string;
        items: {
            type: string;
            example: string;
        };
    };
    UserListResponseDto?: {
        type: string;
        properties: {
            data: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            meta: {
                type: string;
                properties: {
                    totalItems: {
                        type: string;
                        example: number;
                    };
                    itemCount: {
                        type: string;
                        example: number;
                    };
                    itemsPerPage: {
                        type: string;
                        example: number;
                    };
                    totalPages: {
                        type: string;
                        example: number;
                    };
                    currentPage: {
                        type: string;
                        example: number;
                    };
                };
            };
        };
    };
    LoginDto?: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    AuthResponseDto?: {
        type: string;
        properties: {
            tokens: {
                type: string;
                properties: {
                    accessToken: {
                        type: string;
                        example: string;
                    };
                    refreshToken: {
                        type: string;
                        example: string;
                    };
                };
            };
            user: {
                $ref: string;
            };
        };
    };
    RegisterDto?: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            organizationName: {
                type: string;
                example: string;
            };
        };
        required: string[];
    };
    RegisterResponseDto?: {
        type: string;
        properties: {
            user: {
                $ref: string;
            };
            organization: {
                $ref: string;
            };
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
    RefreshTokenDto?: {
        type: string;
        properties: {
            refreshToken: {
                type: string;
                example: string;
            };
        };
        required: string[];
    };
    ForgotPasswordDto?: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    ResetPasswordDto?: {
        type: string;
        properties: {
            token: {
                type: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    VerifyEmailDto?: {
        type: string;
        properties: {
            token: {
                type: string;
                example: string;
            };
        };
        required: string[];
    };
    MessageResponseDto?: {
        type: string;
        properties: {
            message: {
                type: string;
                example: string;
            };
        };
    };
};
