"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaths = void 0;
// src/swagger/paths/index.ts
const auth_path_1 = require("./auth.path");
const user_path_1 = require("./user.path");
const contact_path_1 = require("./contact.path");
function getAllPaths() {
    console.log('Loading API paths...');
    // Safely check if objects exist before trying to access their keys
    const authPathsCount = auth_path_1.authPaths ? Object.keys(auth_path_1.authPaths).length : 0;
    const userPathsCount = user_path_1.userPaths ? Object.keys(user_path_1.userPaths).length : 0;
    const contactPathsCount = contact_path_1.contactPaths ? Object.keys(contact_path_1.contactPaths).length : 0;
    console.log('Auth paths:', authPathsCount);
    console.log('User paths:', userPathsCount);
    console.log('Contact paths:', contactPathsCount);
    const allPaths = Object.assign(Object.assign(Object.assign({}, (auth_path_1.authPaths || {})), (user_path_1.userPaths || {})), (contact_path_1.contactPaths || {}));
    console.log('Total paths loaded:', Object.keys(allPaths).length);
    return allPaths;
}
exports.getAllPaths = getAllPaths;
//# sourceMappingURL=index.js.map