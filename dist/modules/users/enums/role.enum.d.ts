export declare enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    DOCTOR = "DOCTOR",
    NURSE = "NURSE",
    RECEPTIONIST = "RECEPTIONIST",
    PATIENT = "PATIENT",
    USER = "USER",
    STAFF = "STAFF",
    AGENT = "AGENT",
    SUPERVISOR = "SUPERVISOR",
    CLIENT = "CLIENT",
    GUEST = "GUEST"
}
export declare const RoleHierarchy: Record<Role, number>;
export declare const RolePermissions: Record<Role, string[]>;
/**
 * Check if role has permission
 */
export declare function hasPermission(role: Role, permission: string): boolean;
/**
 * Check if role has higher or equal hierarchy level
 */
export declare function hasHigherOrEqualRole(userRole: Role, requiredRole: Role): boolean;
/**
 * Get role display name
 */
export declare function getRoleDisplayName(role: Role): string;
