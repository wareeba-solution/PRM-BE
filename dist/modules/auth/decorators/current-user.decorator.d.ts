/**
 * Current user decorator
 * Use this decorator to extract the current user from the request
 * Example: @CurrentUser() user: User
 */
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
