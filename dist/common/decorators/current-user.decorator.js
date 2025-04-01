import { createParamDecorator } from '@nestjs/common';
export const CurrentUser = createParamDecorator((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        return null;
    }
    if (!data) {
        return user;
    }
    return data.split('.').reduce((obj, key) => {
        return obj === null || obj === void 0 ? void 0 : obj[key];
    }, user);
});
export const TypedCurrentUser = (propertyPath) => CurrentUser(propertyPath);
//# sourceMappingURL=current-user.decorator.js.map