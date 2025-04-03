/// <reference types="node" />
/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
interface UploadOptions {
    fileName: string;
    buffer: Buffer;
    mimeType?: string;
    organizationId: string;
    module: string;
    isPrivate?: boolean;
    metadata?: Record<string, string>;
}
interface GenerateUrlOptions {
    key: string;
    expiresIn?: number;
    responseContentDisposition?: string;
}
export declare class StorageService {
    private readonly configService;
    private readonly logger;
    private readonly bucketName;
    private readonly cdnDomain?;
    constructor(configService: ConfigService);
    /**
     * Upload file to storage
     */
    upload(options: UploadOptions): Promise<{
        key: string;
        url: string;
        size: number;
        mimeType: string;
    }>;
    /**
     * Generate signed URL for private files
     */
    generateSignedUrl(options: GenerateUrlOptions): Promise<string>;
    /**
     * Generate public URL for non-private files
     */
    private generatePublicUrl;
    /**
     * Delete file from storage
     */
    delete(key: string): Promise<void>;
    /**
     * Generate storage key for file
     */
    private generateStorageKey;
    /**
     * Get file metadata
     */
    getMetadata(key: string): Promise<Record<string, string>>;
    /**
     * Copy file within storage
     */
    copy(sourceKey: string, destinationKey: string): Promise<void>;
    /**
     * Move file within storage
     */
    move(sourceKey: string, destinationKey: string): Promise<void>;
    /**
     * Get bucket location for a module
     */
    getModuleBucketLocation(module: string): string;
    /**
     * Helper to guess MIME type from filename
     */
    private guessMimeType;
}
export {};
