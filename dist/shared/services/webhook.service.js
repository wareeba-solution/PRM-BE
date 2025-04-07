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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
const SENSITIVE_FIELDS = ['password', 'token', 'secret', 'key', 'auth', 'credentials'];
let WebhookService = WebhookService_1 = class WebhookService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(WebhookService_1.name);
        this.axiosInstance = axios_1.default.create({
            timeout: this.configService.get('WEBHOOK_TIMEOUT', 5000),
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': `${this.configService.get('APP_NAME', 'NotificationService')}/1.0`,
            },
            validateStatus: (status) => status >= 200 && status < 300,
        });
        this.defaultConfig = {
            method: 'POST',
            timeout: 5000,
            retryAttempts: 3,
            retryDelay: 1000,
            validateResponse: true,
        };
        // Add request interceptor for logging
        this.axiosInstance.interceptors.request.use((config) => {
            config.metadata = { startTime: Date.now() };
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // Add response interceptor for logging
        this.axiosInstance.interceptors.response.use((response) => {
            var _a;
            const metadata = response.config.metadata;
            const duration = Date.now() - ((_a = metadata === null || metadata === void 0 ? void 0 : metadata.startTime) !== null && _a !== void 0 ? _a : Date.now());
            this.logger.debug(`Webhook request completed in ${duration}ms`);
            return response;
        }, (error) => {
            const duration = Date.now() - error.config.metadata.startTime;
            this.logger.error(`Webhook request failed after ${duration}ms: ${error.message}`);
            return Promise.reject(error);
        });
    }
    async send(notification) {
        var _a, _b, _c, _d, _e, _f;
        const startTime = Date.now();
        const webhookConfig = this.getWebhookConfig(notification);
        let attempt = 0;
        let lastError = null;
        while (attempt < ((_b = (_a = webhookConfig.retryAttempts) !== null && _a !== void 0 ? _a : this.defaultConfig.retryAttempts) !== null && _b !== void 0 ? _b : 3)) {
            try {
                const response = await this.makeRequest(notification, webhookConfig);
                const duration = Date.now() - startTime;
                if (webhookConfig.validateResponse && !this.isValidResponse(response)) {
                    throw new Error('Invalid response received from webhook endpoint');
                }
                return {
                    success: true,
                    statusCode: response.status,
                    retryCount: attempt,
                    duration,
                };
            }
            catch (error) {
                attempt++;
                lastError = error;
                this.logger.warn(`Webhook delivery attempt ${attempt} failed for notification ${notification.id}:`, error.message);
                if (attempt < ((_d = ((_c = webhookConfig.retryAttempts) !== null && _c !== void 0 ? _c : this.defaultConfig.retryAttempts)) !== null && _d !== void 0 ? _d : 3)) {
                    await this.delay(((_f = ((_e = webhookConfig.retryDelay) !== null && _e !== void 0 ? _e : this.defaultConfig.retryDelay)) !== null && _f !== void 0 ? _f : 1000) * Math.pow(2, attempt - 1)); // Exponential backoff
                }
            }
        }
        return {
            success: false,
            error: (lastError === null || lastError === void 0 ? void 0 : lastError.message) || 'Unknown error',
            retryCount: attempt,
            duration: Date.now() - startTime,
        };
    }
    async makeRequest(notification, config) {
        var _a;
        const payload = this.preparePayload(notification);
        const signature = this.generateSignature(payload, config.secret);
        const requestId = crypto.randomUUID();
        const requestConfig = {
            method: config.method,
            url: config.url,
            data: payload,
            timeout: config.timeout,
            headers: Object.assign(Object.assign({}, config.headers), { 'X-Webhook-Signature': signature, 'X-Notification-ID': notification.id, 'X-Request-ID': requestId, 'X-Timestamp': new Date().toISOString() }),
        };
        try {
            return await this.axiosInstance.request(requestConfig);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const responseData = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
                throw new Error(`Webhook request failed: ${error.message}. Response: ${JSON.stringify(responseData)}`);
            }
            throw error;
        }
    }
    generateSignature(payload, secret) {
        if (!secret)
            return '';
        return crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(payload))
            .digest('hex');
    }
    preparePayload(notification) {
        const basePayload = {
            id: notification.id,
            type: notification.type,
            subject: notification.subject,
            content: notification.content,
            recipient: this.filterSensitiveData(notification.recipient),
            metadata: notification.metadata,
            timestamp: new Date().toISOString(),
            version: '1.0',
            // Using content instead of context
        };
        // No need to add additional context as we're already using content
        return basePayload;
    }
    filterSensitiveData(data) {
        const filtered = {};
        for (const [key, value] of Object.entries(data)) {
            if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field))) {
                continue;
            }
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                filtered[key] = this.filterSensitiveData(value);
            }
            else {
                filtered[key] = value;
            }
        }
        return filtered;
    }
    getWebhookConfig(notification) {
        const webhookUrl = this.getWebhookUrl(notification);
        if (!webhookUrl) {
            throw new Error('No webhook URL configured for notification');
        }
        return Object.assign(Object.assign({}, this.defaultConfig), { url: webhookUrl, secret: this.configService.get('WEBHOOK_SECRET'), headers: this.getCustomHeaders(notification) });
    }
    getWebhookUrl(notification) {
        var _a;
        // First check notification-specific webhook URL
        if ((_a = notification.metadata) === null || _a === void 0 ? void 0 : _a.webhookUrl) {
            return notification.metadata.webhookUrl;
        }
        // Then check type-specific webhook URL from config
        const typeSpecificUrl = this.configService.get(`WEBHOOK_URL_${notification.type}`);
        if (typeSpecificUrl) {
            return typeSpecificUrl;
        }
        // Finally fall back to default webhook URL
        return this.configService.get('WEBHOOK_URL') || '';
    }
    getCustomHeaders(notification) {
        const customHeaders = {};
        // Add type-specific headers
        if (notification.type) {
            customHeaders['X-Notification-Type'] = notification.type;
        }
        // Add organization-specific headers if available
        if (notification.organizationId) {
            customHeaders['X-Organization-ID'] = notification.organizationId;
        }
        return customHeaders;
    }
    isValidResponse(response) {
        return response.status >= 200 && response.status < 300;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
WebhookService = WebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WebhookService);
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map