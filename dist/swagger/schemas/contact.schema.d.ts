export declare const contactSchemas: {
    SimpleContactDto: {
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
    CreateContactDto: {
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
    UpdateContactDto: {
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
};
