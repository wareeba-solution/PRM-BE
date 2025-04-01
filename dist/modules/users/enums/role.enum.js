export var Role;
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
})(Role || (Role = {}));
export const RoleHierarchy = {
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
export const RolePermissions = {
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
export function hasPermission(role, permission) {
    const permissions = RolePermissions[role];
    return permissions.includes('*') || permissions.includes(permission);
}
export function hasHigherOrEqualRole(userRole, requiredRole) {
    return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole];
}
export function getRoleDisplayName(role) {
    return role.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
//# sourceMappingURL=role.enum.js.map