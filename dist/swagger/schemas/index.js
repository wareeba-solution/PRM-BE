"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSchemas = void 0;
const user_schema_js_1 = require("./user.schema.js");
const auth_schema_js_1 = require("./auth.schema.js");
function getAllSchemas() {
    return Object.assign(Object.assign({}, user_schema_js_1.userSchemas), auth_schema_js_1.authSchemas);
}
exports.getAllSchemas = getAllSchemas;
//# sourceMappingURL=index.js.map