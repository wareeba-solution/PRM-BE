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
var PushNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = __importStar(require("firebase-admin"));
let PushNotificationService = PushNotificationService_1 = class PushNotificationService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(PushNotificationService_1.name);
        this.mockMode = false;
        this.initializeFirebase();
    }
    initializeFirebase() {
        try {
            // Check if Firebase credentials are available
            const projectId = this.configService.get('FIREBASE_PROJECT_ID');
            const clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
            let privateKey = this.configService.get('FIREBASE_PRIVATE_KEY');
            // Check for mock configuration
            if (projectId === 'mock' || clientEmail === 'mock' || privateKey === 'mock') {
                this.logger.warn('Mock Firebase configuration detected - using mock implementation');
                this.initMockFirebase();
                this.mockMode = true;
                return;
            }
            // Check if credentials are present
            if (!projectId || !clientEmail || !privateKey) {
                this.logger.warn('Firebase credentials incomplete - using mock implementation');
                this.initMockFirebase();
                this.mockMode = true;
                return;
            }
            // Fix common PEM formatting issues
            if (privateKey) {
                // Replace escaped newlines with actual newlines if needed
                if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
                    privateKey = privateKey.replace(/\\n/g, '\n');
                }
                // Ensure proper PEM format
                if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
                    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}`;
                }
                if (!privateKey.endsWith('-----END PRIVATE KEY-----')) {
                    privateKey = `${privateKey}\n-----END PRIVATE KEY-----`;
                }
            }
            // Check if Firebase app is already initialized
            if (admin.apps.length) {
                this.firebaseApp = admin.apps[0];
                this.logger.log('Using existing Firebase Admin SDK instance');
            }
            else {
                // Initialize Firebase Admin SDK
                this.firebaseApp = admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId,
                        clientEmail,
                        privateKey,
                    }),
                    databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
                });
                this.logger.log('Firebase Admin SDK initialized successfully');
            }
        }
        catch (error) {
            this.logger.warn(`Failed to initialize Firebase: ${error.message}`);
            this.logger.warn('Using mock implementation instead');
            this.initMockFirebase();
            this.mockMode = true;
        }
    }
    initMockFirebase() {
        // Create a mock Firebase messaging service
        this.firebaseApp = {
            messaging: () => ({
                send: async (message) => {
                    var _a, _b;
                    this.logger.log(`[MOCK] Sending push notification to ${message.token || 'unknown'}`);
                    this.logger.debug('[MOCK] Push notification payload:', {
                        title: (_a = message.notification) === null || _a === void 0 ? void 0 : _a.title,
                        body: (_b = message.notification) === null || _b === void 0 ? void 0 : _b.body
                    });
                    return `mock-message-id-${Date.now()}`;
                },
                sendAll: async (messages) => {
                    this.logger.log(`[MOCK] Sending batch of ${messages.length} push notifications`);
                    return {
                        successCount: messages.length,
                        failureCount: 0,
                        responses: messages.map(() => ({
                            success: true,
                            messageId: `mock-message-id-${Date.now()}`,
                            error: null
                        }))
                    };
                },
                subscribeToTopic: async (tokens, topic) => {
                    this.logger.log(`[MOCK] Subscribing ${tokens.length} tokens to topic ${topic}`);
                    return { successCount: tokens.length, failureCount: 0, errors: [] };
                },
                unsubscribeFromTopic: async (tokens, topic) => {
                    this.logger.log(`[MOCK] Unsubscribing ${tokens.length} tokens from topic ${topic}`);
                    return { successCount: tokens.length, failureCount: 0, errors: [] };
                }
            })
        };
    }
    async send(notification) {
        try {
            const { recipient, content, subject, metadata } = notification;
            // In mock mode, don't throw error if FCM token is missing
            if (!this.mockMode && !recipient.fcmToken) {
                throw new Error('Recipient FCM token not found');
            }
            const token = recipient.fcmToken || 'mock-token';
            const message = {
                notification: {
                    title: subject,
                    body: this.formatContent(content),
                },
                data: this.prepareData(metadata),
                token,
                android: this.getAndroidConfig(metadata),
                apns: this.getApnsConfig(metadata),
                webpush: this.getWebPushConfig(metadata),
            };
            const response = await this.firebaseApp.messaging().send(message);
            this.logger.debug(`Push notification sent: ${response}`);
        }
        catch (error) {
            this.logger.error('Failed to send push notification:', error);
            if (!this.mockMode) {
                throw new Error(`Push notification delivery failed: ${error.message}`);
            }
            else {
                this.logger.warn('[MOCK] Continuing despite push notification error');
            }
        }
    }
    formatContent(content) {
        // Remove HTML tags and truncate if necessary
        return content.replace(/<[^>]*>/g, '').substring(0, 1000);
    }
    prepareData(metadata = {}) {
        // Convert metadata to string key-value pairs for FCM data payload
        const data = {};
        Object.entries(metadata || {}).forEach(([key, value]) => {
            if (typeof value !== 'undefined' && value !== null) {
                data[key] = String(value);
            }
        });
        return data;
    }
    getAndroidConfig(metadata = {}) {
        return {
            priority: 'high',
            notification: {
                icon: (metadata === null || metadata === void 0 ? void 0 : metadata.androidIcon) || 'default_icon',
                color: (metadata === null || metadata === void 0 ? void 0 : metadata.androidColor) || '#000000',
                clickAction: (metadata === null || metadata === void 0 ? void 0 : metadata.androidClickAction) || 'FLUTTER_NOTIFICATION_CLICK',
            },
            data: this.prepareData(metadata === null || metadata === void 0 ? void 0 : metadata.androidData),
        };
    }
    getApnsConfig(metadata = {}) {
        return {
            payload: Object.assign({ aps: {
                    alert: {
                        title: metadata === null || metadata === void 0 ? void 0 : metadata.apnsTitle,
                        body: metadata === null || metadata === void 0 ? void 0 : metadata.apnsBody,
                    },
                    badge: (metadata === null || metadata === void 0 ? void 0 : metadata.apnsBadge) || 1,
                    sound: (metadata === null || metadata === void 0 ? void 0 : metadata.apnsSound) || 'default',
                } }, this.prepareData(metadata === null || metadata === void 0 ? void 0 : metadata.apnsData)),
        };
    }
    getWebPushConfig(metadata = {}) {
        return {
            notification: {
                icon: metadata === null || metadata === void 0 ? void 0 : metadata.webIcon,
                badge: metadata === null || metadata === void 0 ? void 0 : metadata.webBadge,
                actions: metadata === null || metadata === void 0 ? void 0 : metadata.webActions,
            },
            data: this.prepareData(metadata === null || metadata === void 0 ? void 0 : metadata.webData),
        };
    }
    async sendBatch(notifications) {
        try {
            const messages = notifications.map(notification => ({
                token: notification.recipient.fcmToken || 'mock-token',
                notification: {
                    title: notification.subject,
                    body: this.formatContent(notification.content),
                },
                data: this.prepareData(notification.metadata),
            }));
            return await this.firebaseApp.messaging().sendAll(messages);
        }
        catch (error) {
            this.logger.error('Failed to send batch push notifications:', error);
            if (!this.mockMode) {
                throw new Error(`Batch push notification delivery failed: ${error.message}`);
            }
            else {
                this.logger.warn('[MOCK] Continuing despite batch push notification error');
                return {
                    successCount: notifications.length,
                    failureCount: 0,
                    responses: []
                };
            }
        }
    }
    async subscribeTopic(tokens, topic) {
        try {
            await this.firebaseApp.messaging().subscribeToTopic(tokens, topic);
            this.logger.log(`Subscribed ${tokens.length} tokens to topic ${topic}`);
        }
        catch (error) {
            this.logger.error(`Failed to subscribe tokens to topic ${topic}:`, error);
            if (!this.mockMode) {
                throw new Error(`Topic subscription failed: ${error.message}`);
            }
            else {
                this.logger.warn('[MOCK] Continuing despite topic subscription error');
            }
        }
    }
    async unsubscribeTopic(tokens, topic) {
        try {
            await this.firebaseApp.messaging().unsubscribeFromTopic(tokens, topic);
            this.logger.log(`Unsubscribed ${tokens.length} tokens from topic ${topic}`);
        }
        catch (error) {
            this.logger.error(`Failed to unsubscribe tokens from topic ${topic}:`, error);
            if (!this.mockMode) {
                throw new Error(`Topic unsubscription failed: ${error.message}`);
            }
            else {
                this.logger.warn('[MOCK] Continuing despite topic unsubscription error');
            }
        }
    }
};
PushNotificationService = PushNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PushNotificationService);
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=push-notification.service.js.map