import { authPaths } from './auth.path';
import { userPaths } from './user.path';
export function getAllPaths() {
    return Object.assign(Object.assign({}, authPaths), userPaths);
}
//# sourceMappingURL=index.js.map