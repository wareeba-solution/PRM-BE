"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(StorageService_1.name);
        this.bucketName = this.configService.get('AWS_S3_BUCKET') || 'default-bucket-name';
        this.cdnDomain = this.configService.get('CDN_DOMAIN');
    }
    /**
     * Upload file to storage
     */
    async upload(options) {
        const { fileName, buffer, mimeType: providedMimeType, organizationId, module, isPrivate = false, metadata = {}, } = options;
        // Generate a unique key for the file
        const key = this.generateStorageKey({
            fileName,
            organizationId,
            module,
        });
        // Determine MIME type - use provided or guess from extension
        const mimeType = providedMimeType || this.guessMimeType(fileName);
        this.logger.log(`[MOCK] Uploading file ${fileName} to ${key}`);
        // Generate URL
        const url = isPrivate
            ? await this.generateSignedUrl({ key })
            : this.generatePublicUrl(key);
        return {
            key,
            url,
            size: buffer.length,
            mimeType,
        };
    }
    /**
     * Generate signed URL for private files
     */
    async generateSignedUrl(options) {
        const { key, expiresIn = 3600 } = options;
        this.logger.log(`[MOCK] Generating signed URL for ${key}`);
        // Generate a mock signed URL
        const expires = Date.now() + (expiresIn * 1000);
        return `https://${this.bucketName}.s3.amazonaws.com/${key}?mock-signature=xxx&expires=${expires}`;
    }
    /**
     * Generate public URL for non-private files
     */
    generatePublicUrl(key) {
        if (this.cdnDomain) {
            return `https://${this.cdnDomain}/${key}`;
        }
        return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    }
    /**
     * Delete file from storage
     */
    async delete(key) {
        this.logger.log(`[MOCK] Deleting file ${key}`);
    }
    /**
     * Generate storage key for file
     */
    generateStorageKey(options) {
        const { fileName, organizationId, module } = options;
        const timestamp = Date.now();
        const random = crypto.randomBytes(8).toString('hex');
        const extension = path.extname(fileName);
        const sanitizedName = path.basename(fileName, extension)
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-');
        return `${organizationId}/${module}/${timestamp}-${random}-${sanitizedName}${extension}`;
    }
    /**
     * Get file metadata
     */
    async getMetadata(key) {
        this.logger.log(`[MOCK] Getting metadata for ${key}`);
        return {
            fileName: path.basename(key),
            contentType: this.guessMimeType(key),
            size: '1024',
            uploadedAt: new Date().toISOString(),
        };
    }
    /**
     * Copy file within storage
     */
    async copy(sourceKey, destinationKey) {
        this.logger.log(`[MOCK] Copying file from ${sourceKey} to ${destinationKey}`);
    }
    /**
     * Move file within storage
     */
    async move(sourceKey, destinationKey) {
        this.logger.log(`[MOCK] Moving file from ${sourceKey} to ${destinationKey}`);
    }
    /**
     * Get bucket location for a module
     */
    getModuleBucketLocation(module) {
        return `${this.bucketName}/${module}`;
    }
    /**
     * Helper to guess MIME type from filename
     */
    guessMimeType(fileName) {
        const extension = path.extname(fileName).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.xls': 'application/vnd.ms-excel',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.txt': 'text/plain',
            '.csv': 'text/csv',
            '.json': 'application/json',
            '.xml': 'application/xml',
            '.zip': 'application/zip',
        };
        return mimeTypes[extension] || 'application/octet-stream';
    }
};
StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map