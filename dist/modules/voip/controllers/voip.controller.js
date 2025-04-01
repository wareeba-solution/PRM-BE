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
import { Controller, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Role } from '../../users/enums/role.enum';
import { CallManagerService } from '../services/call-manager.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
let VoipController = class VoipController {
    constructor(callManagerService) {
        this.callManagerService = callManagerService;
    }
    async placeCall(data) {
        const { destination, options } = data;
        return {
            callId: await this.callManagerService.placeCall(destination, options),
        };
    }
    async getCalls(query) {
    }
    async getCallDetails(id) {
    }
};
__decorate([
    Roles(Role.ADMIN, Role.DOCTOR),
    Roles(Role.ADMIN, Role.DOCTOR),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoipController.prototype, "placeCall", null);
__decorate([
    Get('calls'),
    Roles(Role.ADMIN, Role.DOCTOR),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoipController.prototype, "getCalls", null);
__decorate([
    Get('calls/:id'),
    Roles(Role.ADMIN, Role.DOCTOR),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoipController.prototype, "getCallDetails", null);
VoipController = __decorate([
    Controller('voip'),
    UseGuards(JwtAuthGuard, RolesGuard),
    __metadata("design:paramtypes", [CallManagerService])
], VoipController);
export { VoipController };
//# sourceMappingURL=voip.controller.js.map