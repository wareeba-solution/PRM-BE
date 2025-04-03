"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../entities/message.entity");
let MessageRepository = class MessageRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findById(id, organizationId) {
        return this.repository.findOne({
            where: { id, organizationId },
            relations: ['contact', 'sender', 'attachments'],
        });
    }
    async create(data) {
        // Create a single entity, bypassing type checking with `any`
        const entity = this.repository.create(data);
        // Save the entity and properly handle the result
        const result = await this.repository.save(entity);
        // Ensure we return a single entity
        if (Array.isArray(result)) {
            if (result.length === 0) {
                throw new Error('Failed to create entity');
            }
            return result[0];
        }
        return result;
    }
};
MessageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map