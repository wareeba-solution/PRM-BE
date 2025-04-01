import { SetMetadata } from '@nestjs/common';
import { Role } from '../../modules/users/enums/role.enum';
export const ROLES_KEY = 'roles';
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
export const PERMISSIONS_KEY = 'permissions';
export var Permission;
(function (Permission) {
    Permission["MANAGE_USERS"] = "manage_users";
    Permission["VIEW_USERS"] = "view_users";
    Permission["MANAGE_CONTACTS"] = "manage_contacts";
    Permission["VIEW_CONTACTS"] = "view_contacts";
    Permission["MANAGE_APPOINTMENTS"] = "manage_appointments";
    Permission["VIEW_APPOINTMENTS"] = "view_appointments";
    Permission["BOOK_APPOINTMENTS"] = "book_appointments";
    Permission["MANAGE_TICKETS"] = "manage_tickets";
    Permission["VIEW_TICKETS"] = "view_tickets";
    Permission["CREATE_TICKETS"] = "create_tickets";
    Permission["ASSIGN_TICKETS"] = "assign_tickets";
    Permission["SEND_MESSAGES"] = "send_messages";
    Permission["VIEW_MESSAGES"] = "view_messages";
    Permission["MANAGE_ORGANIZATION"] = "manage_organization";
    Permission["VIEW_ORGANIZATION"] = "view_organization";
    Permission["MANAGE_SETTINGS"] = "manage_settings";
    Permission["VIEW_SETTINGS"] = "view_settings";
})(Permission || (Permission = {}));
export const Permissions = (...permissions) => SetMetadata(PERMISSIONS_KEY, permissions);
export const RolePermissions = {
    [Role.SUPER_ADMIN]: Object.values(Permission),
    [Role.ADMIN]: [
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
    [Role.DOCTOR]: [
        Permission.VIEW_CONTACTS,
        Permission.MANAGE_APPOINTMENTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.VIEW_TICKETS,
        Permission.CREATE_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
    ],
    [Role.STAFF]: [
        Permission.VIEW_CONTACTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.BOOK_APPOINTMENTS,
        Permission.VIEW_TICKETS,
        Permission.CREATE_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
    ],
    [Role.RECEPTIONIST]: [
        Permission.VIEW_CONTACTS,
        Permission.BOOK_APPOINTMENTS,
        Permission.VIEW_APPOINTMENTS,
        Permission.CREATE_TICKETS,
        Permission.VIEW_TICKETS,
        Permission.SEND_MESSAGES,
        Permission.VIEW_MESSAGES,
    ],
    [Role.AGENT]: [],
    [Role.SUPERVISOR]: [],
    [Role.CLIENT]: [],
    [Role.USER]: [],
    [Role.GUEST]: [],
    [Role.MANAGER]: [],
    [Role.NURSE]: [],
    [Role.PATIENT]: []
};
export function hasPermission(role, permission) {
    var _a;
    return ((_a = RolePermissions[role]) === null || _a === void 0 ? void 0 : _a.includes(permission)) || false;
}
export function getRolePermissions(role) {
    return RolePermissions[role] || [];
}
//# sourceMappingURL=roles.decorator.js.map