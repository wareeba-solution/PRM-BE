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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Injectable, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { hash, compare } from 'bcrypt';
import { User } from '../entities/user.entity';
import { UserActivity } from '../entities/user-activity.entity';
import { Role } from '../enums/role.enum';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { paginate } from 'nestjs-typeorm-paginate';
let UsersService = class UsersService {
    findUsersByRole(organizationId, arg1) {
        throw new Error('Method not implemented.');
    }
    constructor(userRepository, activityRepository, dataSource, eventEmitter, notificationsService) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.dataSource = dataSource;
        this.eventEmitter = eventEmitter;
        this.notificationsService = notificationsService;
        this.permissionsByRole = {
            [Role.SUPER_ADMIN]: [
                'all.read', 'all.create', 'all.update', 'all.delete',
                'users.manage', 'organizations.manage', 'settings.manage',
                'reports.access', 'permissions.manage', 'billing.manage'
            ],
            [Role.ADMIN]: [
                'users.read', 'users.create', 'users.update', 'users.delete',
                'contacts.read', 'contacts.create', 'contacts.update', 'contacts.delete',
                'appointments.read', 'appointments.create', 'appointments.update', 'appointments.delete',
                'reports.access', 'settings.manage', 'notifications.manage'
            ],
            [Role.MANAGER]: [
                'users.read', 'contacts.read', 'contacts.create', 'contacts.update',
                'appointments.read', 'appointments.create', 'appointments.update',
                'reports.access', 'tasks.manage'
            ],
            [Role.DOCTOR]: [
                'contacts.read', 'contacts.create', 'contacts.update',
                'appointments.read', 'appointments.create', 'appointments.update',
                'medical.read', 'medical.write'
            ],
            [Role.NURSE]: [
                'contacts.read', 'contacts.update',
                'appointments.read', 'appointments.update',
                'medical.read', 'medical.write', 'vitals.manage'
            ],
            [Role.STAFF]: [
                'contacts.read', 'appointments.read', 'appointments.create',
                'tasks.read', 'tasks.create'
            ]
        };
    }
    async findByRole(role, organizationId) {
        return this.userRepository.find({
            where: {
                role: role,
                organizationId,
            },
        });
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const existingUser = await this.userRepository.findOne({
                where: [
                    { email: data.email },
                    { phoneNumber: data.phoneNumber },
                ],
            });
            if (existingUser) {
                throw new ConflictException(existingUser.email === data.email
                    ? 'Email already registered'
                    : 'Phone number already registered');
            }
            const hashedPassword = await hash(data.password, 12);
            const { createdBy } = data, userData = __rest(data, ["createdBy"]);
            const user = this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            await queryRunner.manager.save(user);
            const activity = this.activityRepository.create({
                userId: user.id,
                organizationId: data.organizationId,
                action: 'USER_CREATED',
                performedById: data.createdBy,
            });
            await queryRunner.manager.save(activity);
            await queryRunner.commitTransaction();
            await this.notificationsService.create({
                type: 'WELCOME',
                title: 'Welcome to the System',
                content: `Welcome ${user.firstName}! Your account has been created successfully.`,
                recipients: [{ userId: user.id }],
                organizationId: data.organizationId,
                senderId: data.createdBy,
            });
            this.eventEmitter.emit('user.created', user);
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findById(id, relations = []) {
        return this.userRepository.findOne({
            where: { id },
            relations
        });
    }
    async findAll(query) {
        const { organizationId, role, isActive, search, department, page = 1, limit = 10, } = query;
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .where('user.organizationId = :organizationId', { organizationId });
        if (role) {
            queryBuilder.andWhere('user.role = :role', { role });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('user.isActive = :isActive', { isActive });
        }
        if (department) {
            queryBuilder.andWhere('user.department = :department', { department });
        }
        if (search) {
            queryBuilder.andWhere('(LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.lastName) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        return paginate(queryBuilder, { page, limit });
    }
    async findOne(id, organizationId) {
        const user = await this.userRepository.findOne({
            where: { id, organizationId },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async update(id, data) {
        const user = await this.findOne(id, data.organizationId);
        Object.assign(user, data);
        await this.userRepository.save(user);
        await this.activityRepository.save({
            userId: user.id,
            organizationId: data.organizationId,
            action: 'USER_UPDATED',
            performedById: data.updatedBy,
        });
        return user;
    }
    async updateProfile(id, data) {
        const user = await this.findOne(id, data.organizationId);
        Object.assign(user, data);
        return this.userRepository.save(user);
    }
    async updatePassword(id, data) {
        const user = await this.findOne(id, data.organizationId);
        const isValidPassword = await compare(data.currentPassword, user.password);
        if (!isValidPassword) {
            throw new BadRequestException('Current password is incorrect');
        }
        user.password = await hash(data.newPassword, 12);
        user.requirePasswordChange = false;
        await this.userRepository.save(user);
        await this.activityRepository.save({
            userId: user.id,
            organizationId: data.organizationId,
            action: 'PASSWORD_CHANGED',
            performedById: user.id,
        });
    }
    async remove(id, organizationId) {
        const user = await this.findOne(id, organizationId);
        await this.userRepository.softRemove(user);
    }
    async activate(id, organizationId) {
        const user = await this.findOne(id, organizationId);
        user.isActive = true;
        user.isLocked = false;
        return this.userRepository.save(user);
    }
    async deactivate(id, organizationId) {
        const user = await this.findOne(id, organizationId);
        user.isActive = false;
        return this.userRepository.save(user);
    }
    async getAdminCount(organizationId) {
        return this.userRepository.count({
            where: {
                organizationId,
                role: Role.ADMIN,
                isActive: true,
            },
        });
    }
    async getActivity(id, query) {
        return this.activityRepository.find({
            where: {
                userId: id,
                organizationId: query.organizationId,
            },
            order: { createdAt: 'DESC' },
        });
    }
    async getPermissions(userId, organizationId) {
        const user = await this.findOne(userId, organizationId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.permissionsByRole[user.role] || [];
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __param(1, InjectRepository(UserActivity)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        DataSource,
        EventEmitter2,
        NotificationsService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map