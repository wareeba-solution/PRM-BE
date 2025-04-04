"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaths = void 0;
const auth_path_1 = require("./auth.path");
const user_path_1 = require("./user.path");
// Import other path files as needed
function getAllPaths() {
    console.log('Loading API paths...');
    console.log('Auth paths:', Object.keys(auth_path_1.authPaths).length);
    console.log('User paths:', Object.keys(user_path_1.userPaths).length);
    const allPaths = Object.assign(Object.assign({}, auth_path_1.authPaths), user_path_1.userPaths);
    console.log('Total paths loaded:', Object.keys(allPaths).length);
    return allPaths;
}
exports.getAllPaths = getAllPaths;
//# sourceMappingURL=index.js.map