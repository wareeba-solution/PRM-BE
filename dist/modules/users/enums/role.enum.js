"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleDisplayName = exports.hasHigherOrEqualRole = exports.hasPermission = exports.RolePermissions = exports.RoleHierarchy = exports.Role = void 0;
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
})(Role = exports.Role || (exports.Role = {}));
exports.RoleHierarchy = {
    [Role.SUPER_ADMIN]: 100,
    [Role.ADMIN]: 90,
    [Role.MANAGER]: 80,
    [Role.DOCTOR]: 70,
    [Role.NURSE]: 60,
    [Role.RECEPTIONIST]: 50,
    [Role.PATIENT]: 20,
    [Role.USER]: 10,
    [Role.STAFF]: 0,
    [Role.AGENT]: 0,
    [Role.SUPERVISOR]: 0,
    [Role.CLIENT]: 0,
    [Role.GUEST]: 0
};
exports.RolePermissions = {
    [Role.SUPER_ADMIN]: ['*'],
    [Role.ADMIN]: [
        'user:manage',
        'department:manage',
        'organization:manage',
        'appointment:manage',
        'patient:manage',
        'report:view'
    ],
    [Role.MANAGER]: [
        'department:view',
        'department:edit',
        'user:view',
        'appointment:manage',
        'patient:view',
        'report:view'
    ],
    [Role.DOCTOR]: [
        'appointment:view',
        'appointment:edit',
        'patient:view',
        'patient:edit',
        'prescription:manage'
    ],
    [Role.NURSE]: [
        'appointment:view',
        'patient:view',
        'patient:edit',
        'vitals:manage'
    ],
    [Role.RECEPTIONIST]: [
        'appointment:view',
        'appointment:schedule',
        'patient:view',
        'patient:register'
    ],
    [Role.PATIENT]: [
        'appointment:view',
        'appointment:schedule',
        'profile:edit'
    ],
    [Role.USER]: [
        'profile:view',
        'profile:edit'
    ],
    [Role.STAFF]: [],
    [Role.AGENT]: [],
    [Role.SUPERVISOR]: [],
    [Role.CLIENT]: [],
    [Role.GUEST]: []
};
/**
 * Check if role has permission
 */
function hasPermission(role, permission) {
    const permissions = exports.RolePermissions[role];
    return permissions.includes('*') || permissions.includes(permission);
}
exports.hasPermission = hasPermission;
/**
 * Check if role has higher or equal hierarchy level
 */
function hasHigherOrEqualRole(userRole, requiredRole) {
    return exports.RoleHierarchy[userRole] >= exports.RoleHierarchy[requiredRole];
}
exports.hasHigherOrEqualRole = hasHigherOrEqualRole;
/**
 * Get role display name
 */
function getRoleDisplayName(role) {
    return role.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
exports.getRoleDisplayName = getRoleDisplayName;
//# sourceMappingURL=role.enum.js.map