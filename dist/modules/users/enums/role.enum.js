"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.RoleHierarchy = exports.Role = void 0;
exports.hasPermission = hasPermission;
exports.hasHigherOrEqualRole = hasHigherOrEqualRole;
exports.getRoleDisplayName = getRoleDisplayName;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["MANAGER"] = "MANAGER";
    Role["DOCTOR"] = "DOCTOR";
    Role["NURSE"] = "NURSE";
    Role["RECEPTIONIST"] = "RECEPTIONIST";
    Role["PATIENT"] = "PATIENT";
    Role["USER"] = "USER";
    Role["STAFF"] = "STAFF";
    Role["AGENT"] = "AGENT";
    Role["SUPERVISOR"] = "SUPERVISOR";
    Role["CLIENT"] = "CLIENT";
    Role["GUEST"] = "GUEST";
})(Role || (exports.Role = Role = {}));
exports.RoleHierarchy = (_a = {},
    _a[Role.SUPER_ADMIN] = 100,
    _a[Role.ADMIN] = 90,
    _a[Role.MANAGER] = 80,
    _a[Role.DOCTOR] = 70,
    _a[Role.NURSE] = 60,
    _a[Role.RECEPTIONIST] = 50,
    _a[Role.PATIENT] = 20,
    _a[Role.USER] = 10,
    _a[Role.STAFF] = 0,
    _a[Role.AGENT] = 0,
    _a[Role.SUPERVISOR] = 0,
    _a[Role.CLIENT] = 0,
    _a[Role.GUEST] = 0,
    _a);
exports.RolePermissions = (_b = {},
    _b[Role.SUPER_ADMIN] = ['*'],
    _b[Role.ADMIN] = [
        'user:manage',
        'department:manage',
        'organization:manage',
        'appointment:manage',
        'patient:manage',
        'report:view'
    ],
    _b[Role.MANAGER] = [
        'department:view',
        'department:edit',
        'user:view',
        'appointment:manage',
        'patient:view',
        'report:view'
    ],
    _b[Role.DOCTOR] = [
        'appointment:view',
        'appointment:edit',
        'patient:view',
        'patient:edit',
        'prescription:manage'
    ],
    _b[Role.NURSE] = [
        'appointment:view',
        'patient:view',
        'patient:edit',
        'vitals:manage'
    ],
    _b[Role.RECEPTIONIST] = [
        'appointment:view',
        'appointment:schedule',
        'patient:view',
        'patient:register'
    ],
    _b[Role.PATIENT] = [
        'appointment:view',
        'appointment:schedule',
        'profile:edit'
    ],
    _b[Role.USER] = [
        'profile:view',
        'profile:edit'
    ],
    _b[Role.STAFF] = [],
    _b[Role.AGENT] = [],
    _b[Role.SUPERVISOR] = [],
    _b[Role.CLIENT] = [],
    _b[Role.GUEST] = [],
    _b);
/**
 * Check if role has permission
 */
function hasPermission(role, permission) {
    var permissions = exports.RolePermissions[role];
    return permissions.includes('*') || permissions.includes(permission);
}
/**
 * Check if role has higher or equal hierarchy level
 */
function hasHigherOrEqualRole(userRole, requiredRole) {
    return exports.RoleHierarchy[userRole] >= exports.RoleHierarchy[requiredRole];
}
/**
 * Get role display name
 */
function getRoleDisplayName(role) {
    return role.split('_')
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); })
        .join(' ');
}
//# sourceMappingURL=role.enum.js.map