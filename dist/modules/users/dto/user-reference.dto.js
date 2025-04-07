"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReferenceDto = void 0;
class UserReferenceDto {
    static fromUser(user) {
        const reference = new UserReferenceDto();
        reference.id = user.id;
        reference.firstName = user.firstName;
        reference.lastName = user.lastName;
        reference.email = user.email;
        return reference;
    }
}
exports.UserReferenceDto = UserReferenceDto;
//# sourceMappingURL=user-reference.dto.js.map