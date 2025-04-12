"use strict";
// src/modules/tenants/tenants.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TenantsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_entity_1 = require("./entities/tenant.entity");
const tenants_service_1 = require("./services/tenants.service");
const tenants_controller_1 = require("./controllers/tenants.controller");
const tenant_onboarding_service_1 = require("./services/tenant-onboarding.service");
const tenant_onboarding_controller_1 = require("./controllers/tenant-onboarding.controller");
const tenant_middleware_1 = require("./middleware/tenant.middleware");
const tenant_database_service_1 = require("./services/tenant-database.service");
const user_entity_1 = require("../users/entities/user.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const user_settings_entity_1 = require("../users/entities/user-settings.entity");
const user_verification_entity_1 = require("../users/entities/user-verification.entity");
const auth_module_1 = require("../auth/auth.module");
const typeorm_2 = require("typeorm");
const init_tenant_schema_1 = require("./init-tenant-schema");
let TenantsModule = TenantsModule_1 = class TenantsModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(TenantsModule_1.name);
    }
    async onModuleInit() {
        // Initialize tenant schema on application startup
        try {
            await (0, init_tenant_schema_1.initTenantSchema)(this.dataSource);
        }
        catch (error) {
            console.error('Failed to initialize tenant schema:', error);
        }
    }
    configure(consumer) {
        this.logger.log('Configuring TenantMiddleware');
        // Apply tenant middleware to all routes
        consumer
            .apply(tenant_middleware_1.TenantMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        this.logger.log('TenantMiddleware configured for all routes');
    }
};
TenantsModule = TenantsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.Tenant, user_entity_1.User, organization_entity_1.Organization, user_settings_entity_1.UserSettings, user_verification_entity_1.UserVerification]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [tenants_controller_1.TenantsController, tenant_onboarding_controller_1.TenantOnboardingController],
        providers: [tenants_service_1.TenantsService, tenant_onboarding_service_1.TenantOnboardingService, tenant_database_service_1.TenantDatabaseService],
        exports: [tenants_service_1.TenantsService, tenant_onboarding_service_1.TenantOnboardingService, tenant_database_service_1.TenantDatabaseService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], TenantsModule);
exports.TenantsModule = TenantsModule;
//# sourceMappingURL=tenants.module.js.map