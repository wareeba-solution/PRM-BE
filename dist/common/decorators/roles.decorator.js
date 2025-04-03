"use strict";
// src/common/decorators/roles.decorator.ts
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.Permissions = exports.Permission = exports.PERMISSIONS_KEY = exports.Roles = exports.ROLES_KEY = void 0;
exports.hasPermission = hasPermission;
exports.getRolePermissions = getRolePermissions;
var common_1 = require("@nestjs/common");
var role_enum_1 = require("../../modules/users/enums/role.enum");
exports.ROLES_KEY = 'roles';
var Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
};
exports.Roles = Roles;
// Permission decorator
exports.PERMISSIONS_KEY = 'permissions';
var Permission;
(function (Permission) {
    // User permissions
    Permission["MANAGE_USERS"] = "manage_users";
    Permission["VIEW_USERS"] = "view_users";
    // Contact permissions
    Permission["MANAGE_CONTACTS"] = "manage_contacts";
    Permission["VIEW_CONTACTS"] = "view_contacts";
    // Appointment permissions
    Permission["MANAGE_APPOINTMENTS"] = "manage_appointments";
    Permission["VIEW_APPOINTMENTS"] = "view_appointments";
    Permission["BOOK_APPOINTMENTS"] = "book_appointments";
    // Ticket permissions
    Permission["MANAGE_TICKETS"] = "manage_tickets";
    Permission["VIEW_TICKETS"] = "view_tickets";
    Permission["CREATE_TICKETS"] = "create_tickets";
    Permission["ASSIGN_TICKETS"] = "assign_tickets";
    // Message permissions
    Permission["SEND_MESSAGES"] = "send_messages";
    Permission["VIEW_MESSAGES"] = "view_messages";
    // Organization permissions
    Permission["MANAGE_ORGANIZATION"] = "manage_organization";
    Permission["VIEW_ORGANIZATION"] = "view_organization";
    // Settings permissions
    Permission["MANAGE_SETTINGS"] = "manage_settings";
    Permission["VIEW_SETTINGS"] = "view_settings";
})(Permission || (exports.Permission = Permission = {}));
var Permissions = function () {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.PERMISSIONS_KEY, permissions);
};
exports.Permissions = Permissions;
// Role definitions with associated permissions
exports.RolePermissions = (_a = {},
    _a[role_enum_1.Role.SUPER_ADMIN] = Object.values(Permission),
    _a[role_enum_1.Role.ADMIN] = [
        Permission.MANAGE_USERS,
        Permission.VIEW_USERS,
        Permission.MANAGE_CONTACTS,
        Permission.VIEW_CONTACTS,
        Permission.MANAGE_APPOINTMENTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.MANAGE_TICKETS,
        Permission.VIEW_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
        Permission.MANAGE_ORGANIZATION,
        Permission.VIEW_ORGANIZATION,
        Permission.MANAGE_SETTINGS,
        Permission.VIEW_SETTINGS,
    ],
    _a[role_enum_1.Role.DOCTOR] = [
        Permission.VIEW_CONTACTS,
        Permission.MANAGE_APPOINTMENTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.VIEW_TICKETS,
        Permission.CREATE_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
    ],
    _a[role_enum_1.Role.STAFF] = [
        Permission.VIEW_CONTACTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.BOOK_APPOINTMENTS,
        Permission.VIEW_TICKETS,
        Permission.CREATE_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
    ],
    _a[role_enum_1.Role.RECEPTIONIST] = [
        Permission.VIEW_CONTACTS,
        Permission.BOOK_APPOINTMENTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.CREATE_TICKETS,
        Permission.VIEW_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
    ],
    _a[role_enum_1.Role.AGENT] = [],
    _a[role_enum_1.Role.SUPERVISOR] = [],
    _a[role_enum_1.Role.CLIENT] = [],
    _a[role_enum_1.Role.USER] = [],
    _a[role_enum_1.Role.GUEST] = [],
    _a[role_enum_1.Role.MANAGER] = [],
    _a[role_enum_1.Role.NURSE] = [],
    _a[role_enum_1.Role.PATIENT] = [],
    _a);
// Helper function to check if a role has a specific permission
function hasPermission(role, permission) {
    var _a;
    return ((_a = exports.RolePermissions[role]) === null || _a === void 0 ? void 0 : _a.includes(permission)) || false;
}
// Helper function to get all permissions for a role
function getRolePermissions(role) {
    return exports.RolePermissions[role] || [];
}
// Example usage:
/*
@Roles(Role.ADMIN, Role.DOCTOR)
@Get('protected-route')
protectedEndpoint() {
    return 'Only admins and doctors can access this';
}

@Permissions(Permission.MANAGE_APPOINTMENTS)
@Get('manage-appointments')
manageAppointments() {
    return 'Only users with MANAGE_APPOINTMENTS permission can access this';
}

@Roles(Role.ADMIN)
@Permissions(Permission.MANAGE_USERS, Permission.VIEW_USERS)
@Get('manage-users')
manageUsers() {
    return 'Only admins with specific permissions can access this';
}
*/ 
//# sourceMappingURL=roles.decorator.js.map