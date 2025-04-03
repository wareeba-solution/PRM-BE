"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaths = void 0;
const auth_path_1 = require("./auth.path");
const user_path_1 = require("./user.path");
// Import other path files as needed
function getAllPaths() {
    return Object.assign(Object.assign({}, auth_path_1.authPaths), user_path_1.userPaths);
}
exports.getAllPaths = getAllPaths;
//# sourceMappingURL=index.js.map