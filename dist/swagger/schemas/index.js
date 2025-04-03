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
exports.getAllSchemas = getAllSchemas;
var user_schema_js_1 = require("./user.schema.js");
var auth_schema_js_1 = require("./auth.schema.js");
function getAllSchemas() {
    return __assign(__assign({}, user_schema_js_1.userSchemas), auth_schema_js_1.authSchemas);
}
//# sourceMappingURL=index.js.map