"use strict";
// src/config/swagger-dto/tenants/organization-setup.dto.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSetupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrganizationSetupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the tenant this organization belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], OrganizationSetupDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the organization',
        example: 'City Medical Center'
    }),
    __metadata("design:type", String)
], OrganizationSetupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Description of the organization',
        example: 'A comprehensive medical center serving the city area'
    }),
    __metadata("design:type", String)
], OrganizationSetupDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Address of the organization',
        example: {
            street: '456 Health Ave',
            city: 'Metropolis',
            state: 'NY',
            country: 'USA',
            postalCode: '54321'
        }
    }),
    __metadata("design:type", Object)
], OrganizationSetupDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Phone number of the organization',
        example: '+1987654321'
    }),
    __metadata("design:type", String)
], OrganizationSetupDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Email of the organization',
        example: 'info@citymedical.com'
    }),
    __metadata("design:type", String)
], OrganizationSetupDto.prototype, "email", void 0);
exports.OrganizationSetupDto = OrganizationSetupDto;
//# sourceMappingURL=organization-setup.dto.js.map