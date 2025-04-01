var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PushNotificationService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
let PushNotificationService = PushNotificationService_1 = class PushNotificationService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new Logger(PushNotificationService_1.name);
        this.mockMode = false;
        this.initializeFirebase();
    }
    initializeFirebase() {
        try {
            const projectId = this.configService.get('FIREBASE_PROJECT_ID');
            const clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
            let privateKey = this.configService.get('FIREBASE_PRIVATE_KEY');
            if (projectId === 'mock' || clientEmail === 'mock' || privateKey === 'mock') {
                this.logger.warn('Mock Firebase configuration detected - using mock implementation');
                this.initMockFirebase();
                this.mockMode = true;
                return;
            }
            if (!projectId || !clientEmail || !privateKey) {
                this.logger.warn('Firebase credentials incomplete - using mock implementation');
                this.initMockFirebase();
                this.mockMode = true;
                return;
            }
            if (privateKey) {
                if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
                    privateKey = privateKey.replace(/\\n/g, '\n');
                }
                if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
                    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}`;
                }
                if (!privateKey.endsWith('-----END PRIVATE KEY-----')) {
                    privateKey = `${privateKey}\n-----END PRIVATE KEY-----`;
                }
            }
            if (admin.apps.length) {
                this.firebaseApp = admin.apps[0];
                this.logger.log('Using existing Firebase Admin SDK instance');
            }
            else {
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
        return content.replace(/<[^>]*>/g, '').substring(0, 1000);
    }
    prepareData(metadata = {}) {
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
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], PushNotificationService);
export { PushNotificationService };
//# sourceMappingURL=push-notification.service.js.map