/**
 * Permissions required for this route
 * @param permissions list of permissions required
 * @returns decorator function
 */
export declare const PERMISSIONS_KEY = "permissions";
export declare const Permissions: (...permissions: string[]) => import("@nestjs/common").CustomDecorator<string>;
