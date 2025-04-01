var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
let Department = class Department {
};
__decorate([
    ApiProperty(),
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Department.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    ApiProperty(),
    Column(),
    __metadata("design:type", String)
], Department.prototype, "organizationId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "description", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "parentDepartmentId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "managerId", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "createdById", void 0);
__decorate([
    ApiProperty(),
    Column({ nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "updatedById", void 0);
__decorate([
    ApiProperty(),
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Department.prototype, "isActive", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Department.prototype, "memberCount", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Department.prototype, "sortOrder", void 0);
__decorate([
    ApiProperty(),
    Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Department.prototype, "metadata", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Department.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Department.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Department.prototype, "deletedAt", void 0);
__decorate([
    ManyToOne(() => Organization),
    JoinColumn({ name: 'organizationId' }),
    __metadata("design:type", Organization)
], Department.prototype, "organization", void 0);
__decorate([
    ManyToOne(() => Department, { nullable: true }),
    JoinColumn({ name: 'parentDepartmentId' }),
    __metadata("design:type", Department)
], Department.prototype, "parentDepartment", void 0);
__decorate([
    OneToMany(() => Department, dept => dept.parentDepartment),
    __metadata("design:type", Array)
], Department.prototype, "childDepartments", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'managerId' }),
    __metadata("design:type", Promise)
], Department.prototype, "manager", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'createdById' }),
    __metadata("design:type", Promise)
], Department.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => User, { lazy: true }),
    JoinColumn({ name: 'updatedById' }),
    __metadata("design:type", Promise)
], Department.prototype, "updatedBy", void 0);
__decorate([
    OneToMany(() => Ticket, ticket => ticket.department),
    __metadata("design:type", Promise)
], Department.prototype, "tickets", void 0);
Department = __decorate([
    Entity('departments')
], Department);
export { Department };
//# sourceMappingURL=department.entity.js.map