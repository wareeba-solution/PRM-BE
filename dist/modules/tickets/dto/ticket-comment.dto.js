"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCommentResponseDto = exports.UpdateTicketCommentDto = exports.CreateTicketCommentDto = exports.CommentAttachment = exports.CommentVisibility = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var CommentVisibility;
(function (CommentVisibility) {
    CommentVisibility["PUBLIC"] = "public";
    CommentVisibility["INTERNAL"] = "internal";
    CommentVisibility["PRIVATE"] = "private";
})(CommentVisibility || (exports.CommentVisibility = CommentVisibility = {}));
var CommentAttachment = function () {
    var _a;
    var _fileName_decorators;
    var _fileName_initializers = [];
    var _fileName_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    var _mimeType_decorators;
    var _mimeType_initializers = [];
    var _mimeType_extraInitializers = [];
    var _fileUrl_decorators;
    var _fileUrl_initializers = [];
    var _fileUrl_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CommentAttachment() {
                this.fileName = __runInitializers(this, _fileName_initializers, void 0);
                this.fileSize = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
                this.mimeType = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
                this.fileUrl = (__runInitializers(this, _mimeType_extraInitializers), __runInitializers(this, _fileUrl_initializers, void 0));
                __runInitializers(this, _fileUrl_extraInitializers);
            }
            CommentAttachment._OPENAPI_METADATA_FACTORY = function () {
                return { fileName: { required: true, type: function () { return String; } }, fileSize: { required: true, type: function () { return Number; } }, mimeType: { required: true, type: function () { return String; } }, fileUrl: { required: true, type: function () { return String; } } };
            };
            return CommentAttachment;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fileName_decorators = [(0, swagger_1.ApiProperty)({ description: 'The original name of the uploaded file' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _fileSize_decorators = [(0, swagger_1.ApiProperty)({ description: 'The file size in bytes' }), (0, class_validator_1.IsNotEmpty)()];
            _mimeType_decorators = [(0, swagger_1.ApiProperty)({ description: 'The MIME type of the file' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _fileUrl_decorators = [(0, swagger_1.ApiProperty)({ description: 'The URL or path to the stored file' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: function (obj) { return "mimeType" in obj; }, get: function (obj) { return obj.mimeType; }, set: function (obj, value) { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
            __esDecorate(null, null, _fileUrl_decorators, { kind: "field", name: "fileUrl", static: false, private: false, access: { has: function (obj) { return "fileUrl" in obj; }, get: function (obj) { return obj.fileUrl; }, set: function (obj, value) { obj.fileUrl = value; } }, metadata: _metadata }, _fileUrl_initializers, _fileUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CommentAttachment = CommentAttachment;
var CreateTicketCommentDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    var _parentId_decorators;
    var _parentId_initializers = [];
    var _parentId_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _mentionedUserIds_decorators;
    var _mentionedUserIds_initializers = [];
    var _mentionedUserIds_extraInitializers = [];
    var _sendNotifications_decorators;
    var _sendNotifications_initializers = [];
    var _sendNotifications_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateTicketCommentDto() {
                this.content = __runInitializers(this, _content_initializers, void 0);
                this.isInternal = __runInitializers(this, _content_extraInitializers);
                this.visibility = __runInitializers(this, _visibility_initializers, void 0);
                this.parentId = (__runInitializers(this, _visibility_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
                this.attachments = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
                this.mentionedUserIds = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _mentionedUserIds_initializers, void 0));
                this.sendNotifications = (__runInitializers(this, _mentionedUserIds_extraInitializers), __runInitializers(this, _sendNotifications_initializers, void 0));
                __runInitializers(this, _sendNotifications_extraInitializers);
            }
            CreateTicketCommentDto._OPENAPI_METADATA_FACTORY = function () {
                return { content: { required: true, type: function () { return String; } }, isInternal: { required: true, type: function () { return Boolean; } }, visibility: { required: false, enum: require("./ticket-comment.dto").CommentVisibility }, parentId: { required: false, type: function () { return String; }, format: "uuid" }, attachments: { required: false, type: function () { return [require("./ticket-comment.dto").CommentAttachment]; } }, mentionedUserIds: { required: false, type: function () { return [String]; }, format: "uuid" }, sendNotifications: { required: false, type: function () { return Boolean; } } };
            };
            return CreateTicketCommentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The main content of the comment',
                    example: 'This is a comment on the ticket'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _visibility_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: CommentVisibility,
                    description: 'Visibility level of the comment',
                    default: CommentVisibility.PUBLIC
                }), (0, class_validator_1.IsEnum)(CommentVisibility), (0, class_validator_1.IsOptional)()];
            _parentId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'ID of the parent comment if this is a reply',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _attachments_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    type: [CommentAttachment],
                    description: 'Array of attachments for the comment'
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return CommentAttachment; }), (0, class_validator_1.IsOptional)()];
            _mentionedUserIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Mentioned user IDs in the comment',
                    type: [String]
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true }), (0, class_validator_1.IsOptional)()];
            _sendNotifications_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the comment should trigger notifications',
                    default: true
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: function (obj) { return "parentId" in obj; }, get: function (obj) { return obj.parentId; }, set: function (obj, value) { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            __esDecorate(null, null, _mentionedUserIds_decorators, { kind: "field", name: "mentionedUserIds", static: false, private: false, access: { has: function (obj) { return "mentionedUserIds" in obj; }, get: function (obj) { return obj.mentionedUserIds; }, set: function (obj, value) { obj.mentionedUserIds = value; } }, metadata: _metadata }, _mentionedUserIds_initializers, _mentionedUserIds_extraInitializers);
            __esDecorate(null, null, _sendNotifications_decorators, { kind: "field", name: "sendNotifications", static: false, private: false, access: { has: function (obj) { return "sendNotifications" in obj; }, get: function (obj) { return obj.sendNotifications; }, set: function (obj, value) { obj.sendNotifications = value; } }, metadata: _metadata }, _sendNotifications_initializers, _sendNotifications_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateTicketCommentDto = CreateTicketCommentDto;
var UpdateTicketCommentDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateTicketCommentDto() {
                this.content = __runInitializers(this, _content_initializers, void 0);
                this.visibility = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
                this.attachments = (__runInitializers(this, _visibility_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
                __runInitializers(this, _attachments_extraInitializers);
            }
            UpdateTicketCommentDto._OPENAPI_METADATA_FACTORY = function () {
                return { content: { required: false, type: function () { return String; } }, visibility: { required: false, enum: require("./ticket-comment.dto").CommentVisibility }, attachments: { required: false, type: function () { return [require("./ticket-comment.dto").CommentAttachment]; } } };
            };
            return UpdateTicketCommentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated content of the comment',
                    example: 'This is the updated comment'
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _visibility_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    enum: CommentVisibility,
                    description: 'Updated visibility level of the comment'
                }), (0, class_validator_1.IsEnum)(CommentVisibility), (0, class_validator_1.IsOptional)()];
            _attachments_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    type: [CommentAttachment],
                    description: 'Updated array of attachments'
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return CommentAttachment; }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
            __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateTicketCommentDto = UpdateTicketCommentDto;
var TicketCommentResponseDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _ticketId_decorators;
    var _ticketId_initializers = [];
    var _ticketId_extraInitializers = [];
    var _authorId_decorators;
    var _authorId_initializers = [];
    var _authorId_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    var _parentId_decorators;
    var _parentId_initializers = [];
    var _parentId_extraInitializers = [];
    var _attachments_decorators;
    var _attachments_initializers = [];
    var _attachments_extraInitializers = [];
    var _mentionedUserIds_decorators;
    var _mentionedUserIds_initializers = [];
    var _mentionedUserIds_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _isEdited_decorators;
    var _isEdited_initializers = [];
    var _isEdited_extraInitializers = [];
    var _replyCount_decorators;
    var _replyCount_initializers = [];
    var _replyCount_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TicketCommentResponseDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.ticketId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
                this.authorId = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
                this.content = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.visibility = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
                this.parentId = (__runInitializers(this, _visibility_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
                this.attachments = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _attachments_initializers, void 0));
                this.mentionedUserIds = (__runInitializers(this, _attachments_extraInitializers), __runInitializers(this, _mentionedUserIds_initializers, void 0));
                this.createdAt = (__runInitializers(this, _mentionedUserIds_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
                this.isEdited = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _isEdited_initializers, void 0));
                this.replyCount = (__runInitializers(this, _isEdited_extraInitializers), __runInitializers(this, _replyCount_initializers, void 0));
                __runInitializers(this, _replyCount_extraInitializers);
            }
            TicketCommentResponseDto._OPENAPI_METADATA_FACTORY = function () {
                return { id: { required: true, type: function () { return String; } }, ticketId: { required: true, type: function () { return String; } }, authorId: { required: true, type: function () { return String; } }, content: { required: true, type: function () { return String; } }, visibility: { required: true, enum: require("./ticket-comment.dto").CommentVisibility }, parentId: { required: false, type: function () { return String; } }, attachments: { required: true, type: function () { return [require("./ticket-comment.dto").CommentAttachment]; } }, mentionedUserIds: { required: true, type: function () { return [String]; } }, createdAt: { required: true, type: function () { return Date; } }, updatedAt: { required: false, type: function () { return Date; } }, deletedAt: { required: false, type: function () { return Date; } }, isEdited: { required: true, type: function () { return Boolean; } }, replyCount: { required: true, type: function () { return Number; } } };
            };
            return TicketCommentResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Unique identifier of the comment',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                })];
            _ticketId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The ticket ID this comment belongs to',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                })];
            _authorId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User ID of the comment author',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                })];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'The main content of the comment',
                    example: 'This is a comment on the ticket'
                })];
            _visibility_decorators = [(0, swagger_1.ApiProperty)({
                    enum: CommentVisibility,
                    description: 'Visibility level of the comment'
                })];
            _parentId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'ID of the parent comment if this is a reply',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                })];
            _attachments_decorators = [(0, swagger_1.ApiProperty)({
                    type: [CommentAttachment],
                    description: 'Array of attachments for the comment'
                })];
            _mentionedUserIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Array of mentioned user IDs',
                    type: [String]
                })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Timestamp when the comment was created',
                    example: '2024-02-10T12:00:00Z'
                })];
            _updatedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Timestamp when the comment was last updated',
                    example: '2024-02-10T13:00:00Z'
                })];
            _deletedAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Timestamp when the comment was deleted',
                    example: '2024-02-10T14:00:00Z'
                })];
            _isEdited_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether the comment has been edited',
                    example: false
                })];
            _replyCount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of replies to this comment',
                    example: 0
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: function (obj) { return "ticketId" in obj; }, get: function (obj) { return obj.ticketId; }, set: function (obj, value) { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: function (obj) { return "authorId" in obj; }, get: function (obj) { return obj.authorId; }, set: function (obj, value) { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: function (obj) { return "parentId" in obj; }, get: function (obj) { return obj.parentId; }, set: function (obj, value) { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _attachments_decorators, { kind: "field", name: "attachments", static: false, private: false, access: { has: function (obj) { return "attachments" in obj; }, get: function (obj) { return obj.attachments; }, set: function (obj, value) { obj.attachments = value; } }, metadata: _metadata }, _attachments_initializers, _attachments_extraInitializers);
            __esDecorate(null, null, _mentionedUserIds_decorators, { kind: "field", name: "mentionedUserIds", static: false, private: false, access: { has: function (obj) { return "mentionedUserIds" in obj; }, get: function (obj) { return obj.mentionedUserIds; }, set: function (obj, value) { obj.mentionedUserIds = value; } }, metadata: _metadata }, _mentionedUserIds_initializers, _mentionedUserIds_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
            __esDecorate(null, null, _isEdited_decorators, { kind: "field", name: "isEdited", static: false, private: false, access: { has: function (obj) { return "isEdited" in obj; }, get: function (obj) { return obj.isEdited; }, set: function (obj, value) { obj.isEdited = value; } }, metadata: _metadata }, _isEdited_initializers, _isEdited_extraInitializers);
            __esDecorate(null, null, _replyCount_decorators, { kind: "field", name: "replyCount", static: false, private: false, access: { has: function (obj) { return "replyCount" in obj; }, get: function (obj) { return obj.replyCount; }, set: function (obj, value) { obj.replyCount = value; } }, metadata: _metadata }, _replyCount_initializers, _replyCount_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TicketCommentResponseDto = TicketCommentResponseDto;
//# sourceMappingURL=ticket-comment.dto.js.map