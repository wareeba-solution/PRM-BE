"use strict";
// src/modules/appointments/appointments.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = exports.AppointmentEventTypes = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const appointments_controller_1 = require("./controllers/appointments.controller");
const appointments_service_1 = require("./services/appointments.service");
const doctor_schedule_service_1 = require("./services/doctor-schedule.service");
const appointment_entity_1 = require("./entities/appointment.entity");
const doctor_schedule_entity_1 = require("./entities/doctor-schedule.entity");
const schedule_exception_entity_1 = require("./entities/schedule-exception.entity");
const user_entity_1 = require("../users/entities/user.entity");
const contact_entity_1 = require("../contacts/entities/contact.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const organization_entity_1 = require("../organizations/entities/organization.entity");
const users_module_1 = require("../users/users.module");
const contacts_module_1 = require("../contacts/contacts.module");
const departments_module_1 = require("../departments/departments.module");
const notifications_module_1 = require("../notifications/notifications.module");
const email_module_1 = require("../email/email.module");
const auth_module_1 = require("../auth/auth.module");
var AppointmentEventTypes;
(function (AppointmentEventTypes) {
    AppointmentEventTypes["CREATED"] = "appointment.created";
    AppointmentEventTypes["UPDATED"] = "appointment.updated";
    AppointmentEventTypes["CANCELLED"] = "appointment.cancelled";
    AppointmentEventTypes["COMPLETED"] = "appointment.completed";
    AppointmentEventTypes["RESCHEDULED"] = "appointment.rescheduled";
})(AppointmentEventTypes = exports.AppointmentEventTypes || (exports.AppointmentEventTypes = {}));
let AppointmentsModule = class AppointmentsModule {
};
AppointmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                appointment_entity_1.Appointment,
                doctor_schedule_entity_1.DoctorSchedule,
                schedule_exception_entity_1.ScheduleException,
                user_entity_1.User,
                contact_entity_1.Contact,
                department_entity_1.Department,
                organization_entity_1.Organization
            ]),
            event_emitter_1.EventEmitterModule.forRoot(),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => contacts_module_1.ContactsModule),
            (0, common_1.forwardRef)(() => departments_module_1.DepartmentsModule),
            (0, common_1.forwardRef)(() => notifications_module_1.NotificationsModule),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule)
        ],
        controllers: [appointments_controller_1.AppointmentsController],
        providers: [appointments_service_1.AppointmentsService, doctor_schedule_service_1.DoctorScheduleService],
        exports: [appointments_service_1.AppointmentsService, doctor_schedule_service_1.DoctorScheduleService]
    })
], AppointmentsModule);
exports.AppointmentsModule = AppointmentsModule;
//# sourceMappingURL=appointments.module.js.map