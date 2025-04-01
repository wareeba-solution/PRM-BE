import { userSchemas } from './user.schema';
import { authSchemas } from './auth.schema';
export function getAllSchemas() {
    return Object.assign(Object.assign({}, userSchemas), authSchemas);
}
//# sourceMappingURL=index.js.map