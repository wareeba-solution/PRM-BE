/**
 * Public route decorator
 * Use this decorator to mark a route as public (no authentication required)
 * Example: @Public()
 */
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
