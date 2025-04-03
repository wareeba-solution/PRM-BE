"use strict";
// src/modules/appointments/services/appointments.service.ts
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.AppointmentsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var appointment_status_enum_1 = require("../enums/appointment-status.enum");
var AppointmentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppointmentsService = _classThis = /** @class */ (function () {
        function AppointmentsService_1(appointmentRepository, userRepository, contactRepository, configService, notificationsService, emailService, doctorScheduleService, eventEmitter) {
            this.appointmentRepository = appointmentRepository;
            this.userRepository = userRepository;
            this.contactRepository = contactRepository;
            this.configService = configService;
            this.notificationsService = notificationsService;
            this.emailService = emailService;
            this.doctorScheduleService = doctorScheduleService;
            this.eventEmitter = eventEmitter;
        }
        AppointmentsService_1.prototype.create = function (createAppointmentDto) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, doctor, patient, isAvailable, appointment, savedAppointment;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.userRepository.findOne({ where: { id: createAppointmentDto.doctorId } }),
                                this.contactRepository.findOne({ where: { id: createAppointmentDto.patientId } }),
                            ])];
                        case 1:
                            _a = _b.sent(), doctor = _a[0], patient = _a[1];
                            if (!doctor)
                                throw new common_1.NotFoundException('Doctor not found');
                            if (!patient)
                                throw new common_1.NotFoundException('Patient not found');
                            return [4 /*yield*/, this.doctorScheduleService.checkAvailability({
                                    doctorId: doctor.id,
                                    startTime: new Date(createAppointmentDto.startTime),
                                    endTime: new Date(createAppointmentDto.endTime),
                                })];
                        case 2:
                            isAvailable = _b.sent();
                            if (!isAvailable) {
                                throw new common_1.ConflictException('Doctor is not available at the selected time');
                            }
                            // Check for conflicting appointments
                            return [4 /*yield*/, this.checkConflicts({
                                    doctorId: doctor.id,
                                    startTime: new Date(createAppointmentDto.startTime),
                                    endTime: new Date(createAppointmentDto.endTime),
                                })];
                        case 3:
                            // Check for conflicting appointments
                            _b.sent();
                            appointment = this.appointmentRepository.create(__assign(__assign({}, createAppointmentDto), { startTime: new Date(createAppointmentDto.startTime), endTime: new Date(createAppointmentDto.endTime) }));
                            return [4 /*yield*/, this.appointmentRepository.save(appointment)];
                        case 4:
                            savedAppointment = _b.sent();
                            if (!('isRecurring' in createAppointmentDto &&
                                createAppointmentDto.isRecurring &&
                                'recurrencePattern' in createAppointmentDto &&
                                createAppointmentDto.recurrencePattern)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.createRecurringAppointments(savedAppointment, createAppointmentDto.recurrencePattern)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6: 
                        // Send notifications
                        return [4 /*yield*/, this.sendAppointmentNotifications(savedAppointment, 'created')];
                        case 7:
                            // Send notifications
                            _b.sent();
                            // Emit event
                            this.eventEmitter.emit('appointment.created', savedAppointment);
                            return [2 /*return*/, savedAppointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var organizationId, startDate, endDate, doctorId, patientId, status, _a, page, _b, limit, queryBuilder, skip, _c, appointments, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            organizationId = query.organizationId, startDate = query.startDate, endDate = query.endDate, doctorId = query.doctorId, patientId = query.patientId, status = query.status, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b;
                            queryBuilder = this.appointmentRepository
                                .createQueryBuilder('appointment')
                                .where('appointment.organizationId = :organizationId', { organizationId: organizationId });
                            // Apply filters
                            if (startDate && endDate) {
                                queryBuilder.andWhere('appointment.startTime BETWEEN :startDate AND :endDate', {
                                    startDate: startDate,
                                    endDate: endDate,
                                });
                            }
                            if (doctorId) {
                                queryBuilder.andWhere('appointment.doctorId = :doctorId', { doctorId: doctorId });
                            }
                            if (patientId) {
                                queryBuilder.andWhere('appointment.patientId = :patientId', { patientId: patientId });
                            }
                            if (status && status.length > 0) {
                                queryBuilder.andWhere('appointment.status IN (:...status)', { status: status });
                            }
                            // Add relationships
                            queryBuilder
                                .leftJoinAndSelect('appointment.doctor', 'doctor')
                                .leftJoinAndSelect('appointment.patient', 'patient')
                                .leftJoinAndSelect('appointment.creator', 'creator');
                            skip = (page - 1) * limit;
                            queryBuilder.skip(skip).take(limit);
                            // Add ordering
                            queryBuilder.orderBy('appointment.startTime', 'ASC');
                            return [4 /*yield*/, queryBuilder.getManyAndCount()];
                        case 1:
                            _c = _d.sent(), appointments = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    data: appointments,
                                    meta: {
                                        page: page,
                                        limit: limit,
                                        total: total,
                                        totalPages: Math.ceil(total / limit),
                                    },
                                }];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.findOne = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.appointmentRepository.findOne({
                                where: { id: id, organizationId: organizationId },
                                relations: ['doctor', 'patient', 'creator', 'updater'],
                            })];
                        case 1:
                            appointment = _a.sent();
                            if (!appointment) {
                                throw new common_1.NotFoundException('Appointment not found');
                            }
                            return [2 /*return*/, appointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.update = function (id, updateAppointmentDto) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment, savedAppointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, updateAppointmentDto.organizationId)];
                        case 1:
                            appointment = _a.sent();
                            if (!appointment.canBeModified()) {
                                throw new common_1.ForbiddenException('Appointment cannot be modified');
                            }
                            if (!(updateAppointmentDto.startTime || updateAppointmentDto.endTime)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.checkConflicts({
                                    doctorId: updateAppointmentDto.doctorId || appointment.doctorId,
                                    startTime: new Date(updateAppointmentDto.startTime || appointment.startTime),
                                    endTime: new Date(updateAppointmentDto.endTime || appointment.endTime),
                                    excludeAppointmentId: id,
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            // Update appointment
                            Object.assign(appointment, updateAppointmentDto);
                            return [4 /*yield*/, this.appointmentRepository.save(appointment)];
                        case 4:
                            savedAppointment = _a.sent();
                            // Send notifications
                            return [4 /*yield*/, this.sendAppointmentNotifications(savedAppointment, 'updated')];
                        case 5:
                            // Send notifications
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('appointment.updated', savedAppointment);
                            return [2 /*return*/, savedAppointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.cancel = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment, updater, savedAppointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            appointment = _a.sent();
                            if (!appointment.canBeModified()) {
                                throw new common_1.ForbiddenException('Appointment cannot be cancelled');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: data.updatedBy } })];
                        case 2:
                            updater = _a.sent();
                            if (!updater) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            appointment.status = appointment_status_enum_1.AppointmentStatus.CANCELLED;
                            appointment.cancellationReason = data.reason;
                            appointment.cancelledAt = new Date();
                            appointment.updatedBy = updater; // Assign User object instead of string
                            return [4 /*yield*/, this.appointmentRepository.save(appointment)];
                        case 3:
                            savedAppointment = _a.sent();
                            // Send notifications
                            return [4 /*yield*/, this.sendAppointmentNotifications(savedAppointment, 'cancelled')];
                        case 4:
                            // Send notifications
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('appointment.cancelled', savedAppointment);
                            return [2 /*return*/, savedAppointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.reschedule = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment, updater, savedAppointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            appointment = _a.sent();
                            if (!appointment.canBeModified()) {
                                throw new common_1.ForbiddenException('Appointment cannot be rescheduled');
                            }
                            // Check doctor availability and conflicts
                            return [4 /*yield*/, this.checkConflicts({
                                    doctorId: appointment.doctorId,
                                    startTime: data.startTime,
                                    endTime: data.endTime,
                                    excludeAppointmentId: id,
                                })];
                        case 2:
                            // Check doctor availability and conflicts
                            _a.sent();
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: data.updatedBy } })];
                        case 3:
                            updater = _a.sent();
                            if (!updater) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            appointment.startTime = data.startTime;
                            appointment.endTime = data.endTime;
                            appointment.status = appointment_status_enum_1.AppointmentStatus.RESCHEDULED;
                            appointment.reschedulingReason = data.reason;
                            appointment.updatedBy = updater; // Assign User object instead of string
                            return [4 /*yield*/, this.appointmentRepository.save(appointment)];
                        case 4:
                            savedAppointment = _a.sent();
                            // Send notifications
                            return [4 /*yield*/, this.sendAppointmentNotifications(savedAppointment, 'rescheduled')];
                        case 5:
                            // Send notifications
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('appointment.rescheduled', savedAppointment);
                            return [2 /*return*/, savedAppointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.confirm = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment, updater, savedAppointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            appointment = _a.sent();
                            if (appointment.status !== appointment_status_enum_1.AppointmentStatus.PENDING) {
                                throw new common_1.BadRequestException('Only pending appointments can be confirmed');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: data.updatedBy } })];
                        case 2:
                            updater = _a.sent();
                            if (!updater) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            appointment.status = appointment_status_enum_1.AppointmentStatus.CONFIRMED;
                            appointment.confirmedAt = new Date();
                            appointment.updatedBy = updater; // Assign User object instead of string
                            return [4 /*yield*/, this.appointmentRepository.save(appointment)];
                        case 3:
                            savedAppointment = _a.sent();
                            // Send notifications
                            return [4 /*yield*/, this.sendAppointmentNotifications(savedAppointment, 'confirmed')];
                        case 4:
                            // Send notifications
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('appointment.confirmed', savedAppointment);
                            return [2 /*return*/, savedAppointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.complete = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment, updater, savedAppointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, data.organizationId)];
                        case 1:
                            appointment = _a.sent();
                            if (appointment.status !== appointment_status_enum_1.AppointmentStatus.CONFIRMED) {
                                throw new common_1.BadRequestException('Only confirmed appointments can be completed');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: data.updatedBy } })];
                        case 2:
                            updater = _a.sent();
                            if (!updater) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            appointment.status = appointment_status_enum_1.AppointmentStatus.COMPLETED;
                            appointment.completedAt = new Date();
                            appointment.updatedBy = updater; // Assign User object instead of string
                            return [4 /*yield*/, this.appointmentRepository.save(appointment)];
                        case 3:
                            savedAppointment = _a.sent();
                            // Send notifications
                            return [4 /*yield*/, this.sendAppointmentNotifications(savedAppointment, 'completed')];
                        case 4:
                            // Send notifications
                            _a.sent();
                            // Emit event
                            this.eventEmitter.emit('appointment.completed', savedAppointment);
                            return [2 /*return*/, savedAppointment];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.remove = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var appointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, organizationId)];
                        case 1:
                            appointment = _a.sent();
                            return [4 /*yield*/, this.appointmentRepository.remove(appointment)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.getCalendarEvents = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var whereClause, appointments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            whereClause = {
                                organizationId: query.organizationId,
                                startTime: (0, typeorm_1.MoreThanOrEqual)(query.start),
                                endTime: (0, typeorm_1.LessThanOrEqual)(query.end),
                            };
                            // Add doctorId filter if provided
                            if (query.doctorId) {
                                whereClause.doctorId = query.doctorId;
                            }
                            return [4 /*yield*/, this.appointmentRepository.find({
                                    where: whereClause,
                                    relations: ['doctor', 'patient'],
                                })];
                        case 1:
                            appointments = _a.sent();
                            // Map appointments to calendar format
                            return [2 /*return*/, appointments.map(function (appointment) {
                                    var _a;
                                    return ({
                                        id: appointment.id,
                                        title: "Appointment with ".concat(((_a = appointment.patient) === null || _a === void 0 ? void 0 : _a.fullName) || 'Patient'),
                                        start: appointment.startTime,
                                        end: appointment.endTime,
                                        status: appointment.status,
                                        doctor: appointment.doctor ? {
                                            id: appointment.doctor.id,
                                            name: appointment.doctor.fullName || "".concat(appointment.doctor.firstName, " ").concat(appointment.doctor.lastName),
                                        } : null,
                                        patient: appointment.patient ? {
                                            id: appointment.patient.id,
                                            name: appointment.patient.fullName || "".concat(appointment.patient.firstName, " ").concat(appointment.patient.lastName),
                                        } : null,
                                    });
                                })];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.findAvailableSlots = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var schedule, startOfDay, endOfDay, bookedAppointments, bookedSlots, slotDuration, slots, workStart, workEnd, currentSlot, _loop_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.doctorScheduleService.getDoctorScheduleForDate(query.doctorId, query.date, query.organizationId)];
                        case 1:
                            schedule = _a.sent();
                            if (!schedule) {
                                return [2 /*return*/, []]; // No schedule found for that day
                            }
                            startOfDay = new Date(query.date);
                            startOfDay.setHours(0, 0, 0, 0);
                            endOfDay = new Date(query.date);
                            endOfDay.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.appointmentRepository.find({
                                    where: {
                                        doctorId: query.doctorId,
                                        organizationId: query.organizationId,
                                        startTime: (0, typeorm_1.Between)(startOfDay, endOfDay),
                                        status: (0, typeorm_1.In)([
                                            appointment_status_enum_1.AppointmentStatus.PENDING,
                                            appointment_status_enum_1.AppointmentStatus.CONFIRMED,
                                            appointment_status_enum_1.AppointmentStatus.RESCHEDULED,
                                        ]),
                                    },
                                })];
                        case 2:
                            bookedAppointments = _a.sent();
                            bookedSlots = bookedAppointments.map(function (appointment) { return ({
                                start: appointment.startTime,
                                end: appointment.endTime,
                            }); });
                            slotDuration = 30;
                            slots = [];
                            workStart = new Date(query.date);
                            workStart.setHours(schedule.workStart.getHours(), schedule.workStart.getMinutes(), 0, 0);
                            workEnd = new Date(query.date);
                            workEnd.setHours(schedule.workEnd.getHours(), schedule.workEnd.getMinutes(), 0, 0);
                            currentSlot = new Date(workStart);
                            _loop_1 = function () {
                                var slotEnd = new Date(currentSlot);
                                slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
                                // Check if this slot overlaps with any booked appointment
                                var isBooked = bookedSlots.some(function (bookedSlot) {
                                    return currentSlot < bookedSlot.end && slotEnd > bookedSlot.start;
                                });
                                // Add the slot to the result
                                slots.push({
                                    start: currentSlot.toTimeString().substring(0, 5), // Format as "HH:MM"
                                    end: slotEnd.toTimeString().substring(0, 5),
                                    available: !isBooked
                                });
                                // Move to next slot
                                currentSlot = new Date(slotEnd);
                            };
                            while (currentSlot < workEnd) {
                                _loop_1();
                            }
                            return [2 /*return*/, slots];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.getStatistics = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        AppointmentsService_1.prototype.checkConflicts = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder, conflictingAppointment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryBuilder = this.appointmentRepository
                                .createQueryBuilder('appointment')
                                .where('appointment.doctorId = :doctorId', { doctorId: data.doctorId })
                                .andWhere('appointment.status NOT IN (:...excludeStatuses)', {
                                excludeStatuses: [appointment_status_enum_1.AppointmentStatus.CANCELLED, appointment_status_enum_1.AppointmentStatus.COMPLETED],
                            })
                                .andWhere('(appointment.startTime, appointment.endTime) OVERLAPS (:startTime, :endTime)', {
                                startTime: data.startTime,
                                endTime: data.endTime,
                            });
                            if (data.excludeAppointmentId) {
                                queryBuilder.andWhere('appointment.id != :excludeId', {
                                    excludeId: data.excludeAppointmentId,
                                });
                            }
                            return [4 /*yield*/, queryBuilder.getOne()];
                        case 1:
                            conflictingAppointment = _a.sent();
                            if (conflictingAppointment) {
                                throw new common_1.ConflictException('Time slot conflicts with another appointment');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        AppointmentsService_1.prototype.createRecurringAppointments = function (parentAppointment, recurrencePattern) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        AppointmentsService_1.prototype.sendAppointmentNotifications = function (appointment, action) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return AppointmentsService_1;
    }());
    __setFunctionName(_classThis, "AppointmentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppointmentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentsService = _classThis;
}();
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointments.service.js.map