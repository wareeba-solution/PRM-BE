"use strict";
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
exports.DoctorScheduleService = void 0;
exports.MoreThanOrEqual = MoreThanOrEqual;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
// Helper function for TypeORM date comparison
function MoreThanOrEqual(date) {
    return (0, typeorm_1.MoreThanOrEqual)(date);
}
var DoctorScheduleService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DoctorScheduleService = _classThis = /** @class */ (function () {
        function DoctorScheduleService_1(doctorScheduleRepository, scheduleExceptionRepository) {
            this.doctorScheduleRepository = doctorScheduleRepository;
            this.scheduleExceptionRepository = scheduleExceptionRepository;
        }
        /**
         * Check if a doctor is available for a specific time slot
         */
        DoctorScheduleService_1.prototype.checkAvailability = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var dayOfWeek, schedule, startHour, startMinute, endHour, endMinute, scheduleStartHour, scheduleStartMinute, scheduleEndHour, scheduleEndMinute, isWithinWorkingHours, startDate, endDate, exceptions, _i, exceptions_1, exception, exceptionStart, exceptionEnd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dayOfWeek = data.startTime.getDay();
                            return [4 /*yield*/, this.doctorScheduleRepository.findOne({
                                    where: {
                                        doctorId: data.doctorId,
                                        dayOfWeek: dayOfWeek,
                                        isActive: true
                                    }
                                })];
                        case 1:
                            schedule = _a.sent();
                            // If no schedule found for this day, doctor is not available
                            if (!schedule) {
                                return [2 /*return*/, false];
                            }
                            startHour = data.startTime.getHours();
                            startMinute = data.startTime.getMinutes();
                            endHour = data.endTime.getHours();
                            endMinute = data.endTime.getMinutes();
                            scheduleStartHour = schedule.workStart.getHours();
                            scheduleStartMinute = schedule.workStart.getMinutes();
                            scheduleEndHour = schedule.workEnd.getHours();
                            scheduleEndMinute = schedule.workEnd.getMinutes();
                            isWithinWorkingHours = (startHour > scheduleStartHour || (startHour === scheduleStartHour && startMinute >= scheduleStartMinute)) &&
                                (endHour < scheduleEndHour || (endHour === scheduleEndHour && endMinute <= scheduleEndMinute));
                            if (!isWithinWorkingHours) {
                                return [2 /*return*/, false];
                            }
                            startDate = new Date(data.startTime);
                            startDate.setHours(0, 0, 0, 0);
                            endDate = new Date(data.endTime);
                            endDate.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.scheduleExceptionRepository.find({
                                    where: {
                                        doctorId: data.doctorId,
                                        startDate: (0, typeorm_1.Between)(startDate, endDate)
                                    }
                                })];
                        case 2:
                            exceptions = _a.sent();
                            // If any exceptions are found, check if they overlap with the appointment time
                            for (_i = 0, exceptions_1 = exceptions; _i < exceptions_1.length; _i++) {
                                exception = exceptions_1[_i];
                                exceptionStart = exception.startTime || exception.startDate;
                                exceptionEnd = exception.endTime || exception.endDate;
                                // Check for overlap
                                if (data.startTime < exceptionEnd && data.endTime > exceptionStart) {
                                    return [2 /*return*/, false];
                                }
                            }
                            // If we get here, the doctor is available for the requested time slot
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Get doctor's schedule for a specific date
         */
        DoctorScheduleService_1.prototype.getDoctorScheduleForDate = function (doctorId, date, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var dayOfWeek, schedule, startOfDay, endOfDay, exception;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dayOfWeek = date.getDay();
                            return [4 /*yield*/, this.doctorScheduleRepository.findOne({
                                    where: {
                                        doctorId: doctorId,
                                        organizationId: organizationId,
                                        dayOfWeek: dayOfWeek,
                                        isActive: true
                                    }
                                })];
                        case 1:
                            schedule = _a.sent();
                            if (!schedule) {
                                return [2 /*return*/, null];
                            }
                            startOfDay = new Date(date);
                            startOfDay.setHours(0, 0, 0, 0);
                            endOfDay = new Date(date);
                            endOfDay.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.scheduleExceptionRepository.findOne({
                                    where: {
                                        doctorId: doctorId,
                                        organizationId: organizationId,
                                        startDate: (0, typeorm_1.Between)(startOfDay, endOfDay)
                                    }
                                })];
                        case 2:
                            exception = _a.sent();
                            if (exception && exception.isFullDay) {
                                // Doctor is not available for the entire day
                                return [2 /*return*/, null];
                            }
                            // Return the schedule, possibly modified by the exception
                            return [2 /*return*/, schedule];
                    }
                });
            });
        };
        /**
         * Get all schedules for a doctor
         */
        DoctorScheduleService_1.prototype.getDoctorSchedules = function (doctorId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.doctorScheduleRepository.find({
                            where: {
                                doctorId: doctorId,
                                organizationId: organizationId,
                                isActive: true
                            },
                            order: {
                                dayOfWeek: 'ASC'
                            }
                        })];
                });
            });
        };
        /**
         * Create or update doctor's schedule
         */
        DoctorScheduleService_1.prototype.createOrUpdateSchedule = function (scheduleData) {
            return __awaiter(this, void 0, void 0, function () {
                var doctorId, dayOfWeek, organizationId, schedule;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            doctorId = scheduleData.doctorId, dayOfWeek = scheduleData.dayOfWeek, organizationId = scheduleData.organizationId;
                            return [4 /*yield*/, this.doctorScheduleRepository.findOne({
                                    where: {
                                        doctorId: doctorId,
                                        dayOfWeek: dayOfWeek,
                                        organizationId: organizationId
                                    }
                                })];
                        case 1:
                            schedule = _a.sent();
                            if (schedule) {
                                // Update existing schedule
                                Object.assign(schedule, scheduleData);
                            }
                            else {
                                // Create new schedule
                                schedule = this.doctorScheduleRepository.create(scheduleData);
                            }
                            return [2 /*return*/, this.doctorScheduleRepository.save(schedule)];
                    }
                });
            });
        };
        /**
         * Create a schedule exception (vacation, time off, etc.)
         */
        DoctorScheduleService_1.prototype.createException = function (exceptionData) {
            return __awaiter(this, void 0, void 0, function () {
                var exception;
                return __generator(this, function (_a) {
                    exception = this.scheduleExceptionRepository.create(exceptionData);
                    return [2 /*return*/, this.scheduleExceptionRepository.save(exception)];
                });
            });
        };
        /**
         * Delete a schedule exception
         */
        DoctorScheduleService_1.prototype.deleteException = function (id, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var exception;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.scheduleExceptionRepository.findOne({
                                where: {
                                    id: id,
                                    organizationId: organizationId
                                }
                            })];
                        case 1:
                            exception = _a.sent();
                            if (!exception) {
                                throw new common_1.NotFoundException('Schedule exception not found');
                            }
                            return [4 /*yield*/, this.scheduleExceptionRepository.remove(exception)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get all future exceptions for a doctor
         */
        DoctorScheduleService_1.prototype.getDoctorExceptions = function (doctorId, organizationId) {
            return __awaiter(this, void 0, void 0, function () {
                var today;
                return __generator(this, function (_a) {
                    today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return [2 /*return*/, this.scheduleExceptionRepository.find({
                            where: {
                                doctorId: doctorId,
                                organizationId: organizationId,
                                endDate: MoreThanOrEqual(today)
                            },
                            order: {
                                startDate: 'ASC'
                            }
                        })];
                });
            });
        };
        return DoctorScheduleService_1;
    }());
    __setFunctionName(_classThis, "DoctorScheduleService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DoctorScheduleService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DoctorScheduleService = _classThis;
}();
exports.DoctorScheduleService = DoctorScheduleService;
//# sourceMappingURL=doctor-schedule.service.js.map