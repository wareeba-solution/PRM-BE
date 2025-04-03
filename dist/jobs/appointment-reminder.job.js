"use strict";
// src/jobs/appointment-reminder.job.ts
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentReminderJob = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var typeorm_1 = require("typeorm");
var appointment_status_enum_1 = require("../modules/appointments/enums/appointment-status.enum");
var AppointmentReminderJob = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handleAppointmentReminders_decorators;
    var _cleanupOldReminders_decorators;
    var AppointmentReminderJob = _classThis = /** @class */ (function () {
        function AppointmentReminderJob_1(appointmentRepository, contactRepository, organizationRepository, emailService, smsService, whatsappService, notificationService) {
            this.appointmentRepository = (__runInitializers(this, _instanceExtraInitializers), appointmentRepository);
            this.contactRepository = contactRepository;
            this.organizationRepository = organizationRepository;
            this.emailService = emailService;
            this.smsService = smsService;
            this.whatsappService = whatsappService;
            this.notificationService = notificationService;
            this.logger = new common_1.Logger(AppointmentReminderJob.name);
        }
        AppointmentReminderJob_1.prototype.handleAppointmentReminders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var appointments, reminderGroups, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 5]);
                            this.logger.log('Starting appointment reminder job');
                            return [4 /*yield*/, this.getUpcomingAppointments()];
                        case 1:
                            appointments = _a.sent();
                            reminderGroups = this.groupAppointmentsByReminderType(appointments);
                            // Process each reminder group
                            return [4 /*yield*/, Promise.all([
                                    this.processEmailReminders(reminderGroups.email),
                                    this.processSmsReminders(reminderGroups.sms),
                                    this.processWhatsappReminders(reminderGroups.whatsapp),
                                ])];
                        case 2:
                            // Process each reminder group
                            _a.sent();
                            this.logger.log("Processed ".concat(appointments.length, " appointment reminders"));
                            return [3 /*break*/, 5];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error('Error processing appointment reminders:', error_1);
                            // Notify admin or monitoring service
                            return [4 /*yield*/, this.notificationService.notifyError('Appointment Reminder Job', error_1)];
                        case 4:
                            // Notify admin or monitoring service
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        AppointmentReminderJob_1.prototype.getUpcomingAppointments = function () {
            return __awaiter(this, void 0, void 0, function () {
                var now, tomorrow, whereClause;
                return __generator(this, function (_a) {
                    now = new Date();
                    tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    whereClause = {
                        startTime: (0, typeorm_1.LessThanOrEqual)(tomorrow),
                        status: appointment_status_enum_1.AppointmentStatus.CONFIRMED,
                        reminderSent: false,
                    };
                    return [2 /*return*/, this.appointmentRepository.find({
                            where: whereClause,
                            relations: ['contact', 'doctor', 'organization'],
                            order: {
                                startTime: 'ASC',
                            },
                        })];
                });
            });
        };
        AppointmentReminderJob_1.prototype.groupAppointmentsByReminderType = function (appointments) {
            var _this = this;
            return appointments.reduce(function (acc, appointment) {
                if (!appointment.contact) {
                    _this.logger.warn("Appointment ".concat(appointment.id, " has no contact information"));
                    return acc;
                }
                if (appointment.contact.allowEmail && appointment.contact.email) {
                    acc.email.push(appointment);
                }
                if (appointment.contact.allowSMS && appointment.contact.phone) {
                    acc.sms.push(appointment);
                }
                if (appointment.contact.allowWhatsApp && appointment.contact.whatsapp) {
                    acc.whatsapp.push(appointment);
                }
                return acc;
            }, { email: [], sms: [], whatsapp: [] });
        };
        AppointmentReminderJob_1.prototype.processEmailReminders = function (appointments) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, appointments_1, appointment, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, appointments_1 = appointments;
                            _a.label = 1;
                        case 1:
                            if (!(_i < appointments_1.length)) return [3 /*break*/, 7];
                            appointment = appointments_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            if (!appointment.contact || !appointment.doctor || !appointment.organization) {
                                this.logger.warn("Skipping email reminder for appointment ".concat(appointment.id, ": missing required relation"));
                                return [3 /*break*/, 6];
                            }
                            return [4 /*yield*/, this.emailService.sendAppointmentReminder(appointment.contact.email || '', {
                                    appointmentId: appointment.id,
                                    patientName: "".concat(appointment.contact.firstName || '', " ").concat(appointment.contact.lastName || '').trim(),
                                    doctorName: "Dr. ".concat(appointment.doctor.firstName || '', " ").concat(appointment.doctor.lastName || '').trim(),
                                    dateTime: appointment.startTime,
                                    location: appointment.location || 'N/A',
                                    notes: appointment.notes || '',
                                    organizationName: appointment.organization.name || 'N/A',
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.markReminderSent(appointment.id)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_2 = _a.sent();
                            this.logger.error("Error sending email reminder for appointment ".concat(appointment.id, ":"), error_2);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        AppointmentReminderJob_1.prototype.processSmsReminders = function (appointments) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, appointments_2, appointment, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, appointments_2 = appointments;
                            _a.label = 1;
                        case 1:
                            if (!(_i < appointments_2.length)) return [3 /*break*/, 7];
                            appointment = appointments_2[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            if (!appointment.contact || !appointment.organization) {
                                this.logger.warn("Skipping SMS reminder for appointment ".concat(appointment.id, ": missing required relation"));
                                return [3 /*break*/, 6];
                            }
                            return [4 /*yield*/, this.smsService.sendAppointmentReminder({
                                    id: appointment.id,
                                    contact: {
                                        phone: appointment.contact.phone || '',
                                        firstName: appointment.contact.firstName || '',
                                        lastName: appointment.contact.lastName || ''
                                    },
                                    dateTime: appointment.startTime,
                                    organization: {
                                        name: appointment.organization.name || 'N/A'
                                    }
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.markReminderSent(appointment.id)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_3 = _a.sent();
                            this.logger.error("Error sending SMS reminder for appointment ".concat(appointment.id, ":"), error_3);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        AppointmentReminderJob_1.prototype.processWhatsappReminders = function (appointments) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, appointments_3, appointment, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, appointments_3 = appointments;
                            _a.label = 1;
                        case 1:
                            if (!(_i < appointments_3.length)) return [3 /*break*/, 7];
                            appointment = appointments_3[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            if (!appointment.contact || !appointment.doctor || !appointment.organization) {
                                this.logger.warn("Skipping WhatsApp reminder for appointment ".concat(appointment.id, ": missing required relation"));
                                return [3 /*break*/, 6];
                            }
                            return [4 /*yield*/, this.whatsappService.sendAppointmentReminder(appointment.contact.whatsapp || '', {
                                    appointmentId: appointment.id,
                                    patientName: "".concat(appointment.contact.firstName || '', " ").concat(appointment.contact.lastName || '').trim(),
                                    doctorName: "Dr. ".concat(appointment.doctor.firstName || '', " ").concat(appointment.doctor.lastName || '').trim(),
                                    dateTime: appointment.startTime,
                                    location: appointment.location || 'N/A',
                                    organizationName: appointment.organization.name || 'N/A',
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.markReminderSent(appointment.id)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_4 = _a.sent();
                            this.logger.error("Error sending WhatsApp reminder for appointment ".concat(appointment.id, ":"), error_4);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        AppointmentReminderJob_1.prototype.markReminderSent = function (appointmentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.appointmentRepository.update(appointmentId, {
                                reminderSent: true,
                                reminderSentAt: new Date(),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Cleanup old reminder records
        AppointmentReminderJob_1.prototype.cleanupOldReminders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var thirtyDaysAgo, whereClause, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                            whereClause = {
                                startTime: (0, typeorm_1.LessThanOrEqual)(thirtyDaysAgo),
                                reminderSent: true,
                            };
                            // Using update without raw SQL
                            return [4 /*yield*/, this.appointmentRepository.update(whereClause, {
                                    reminderSent: false,
                                    reminderSentAt: undefined,
                                })];
                        case 1:
                            // Using update without raw SQL
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.error('Error cleaning up old reminders:', error_5);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return AppointmentReminderJob_1;
    }());
    __setFunctionName(_classThis, "AppointmentReminderJob");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handleAppointmentReminders_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES)];
        _cleanupOldReminders_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT)];
        __esDecorate(_classThis, null, _handleAppointmentReminders_decorators, { kind: "method", name: "handleAppointmentReminders", static: false, private: false, access: { has: function (obj) { return "handleAppointmentReminders" in obj; }, get: function (obj) { return obj.handleAppointmentReminders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cleanupOldReminders_decorators, { kind: "method", name: "cleanupOldReminders", static: false, private: false, access: { has: function (obj) { return "cleanupOldReminders" in obj; }, get: function (obj) { return obj.cleanupOldReminders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppointmentReminderJob = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentReminderJob = _classThis;
}();
exports.AppointmentReminderJob = AppointmentReminderJob;
//# sourceMappingURL=appointment-reminder.job.js.map