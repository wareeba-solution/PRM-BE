"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPaths = getAllPaths;
var auth_path_1 = require("./auth.path");
var user_path_1 = require("./user.path");
// Import other path files as needed
function getAllPaths() {
    return __assign(__assign({}, auth_path_1.authPaths), user_path_1.userPaths);
}
//# sourceMappingURL=index.js.map