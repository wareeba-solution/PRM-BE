var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StorageService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as crypto from 'crypto';
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new Logger(StorageService_1.name);
        this.bucketName = this.configService.get('AWS_S3_BUCKET') || 'default-bucket-name';
        this.cdnDomain = this.configService.get('CDN_DOMAIN');
    }
    async upload(options) {
        const { fileName, buffer, mimeType: providedMimeType, organizationId, module, isPrivate = false, metadata = {}, } = options;
        const key = this.generateStorageKey({
            fileName,
            organizationId,
            module,
        });
        const mimeType = providedMimeType || this.guessMimeType(fileName);
        this.logger.log(`[MOCK] Uploading file ${fileName} to ${key}`);
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
    async generateSignedUrl(options) {
        const { key, expiresIn = 3600 } = options;
        this.logger.log(`[MOCK] Generating signed URL for ${key}`);
        const expires = Date.now() + (expiresIn * 1000);
        return `https://${this.bucketName}.s3.amazonaws.com/${key}?mock-signature=xxx&expires=${expires}`;
    }
    generatePublicUrl(key) {
        if (this.cdnDomain) {
            return `https://${this.cdnDomain}/${key}`;
        }
        return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    }
    async delete(key) {
        this.logger.log(`[MOCK] Deleting file ${key}`);
    }
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
    async getMetadata(key) {
        this.logger.log(`[MOCK] Getting metadata for ${key}`);
        return {
            fileName: path.basename(key),
            contentType: this.guessMimeType(key),
            size: '1024',
            uploadedAt: new Date().toISOString(),
        };
    }
    async copy(sourceKey, destinationKey) {
        this.logger.log(`[MOCK] Copying file from ${sourceKey} to ${destinationKey}`);
    }
    async move(sourceKey, destinationKey) {
        this.logger.log(`[MOCK] Moving file from ${sourceKey} to ${destinationKey}`);
    }
    getModuleBucketLocation(module) {
        return `${this.bucketName}/${module}`;
    }
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
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map