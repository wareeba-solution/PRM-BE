"use strict";
// src/modules/appointments/subscribers/appointment.subscriber.ts
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSubscriber = void 0;
var typeorm_1 = require("typeorm");
var common_1 = require("@nestjs/common");
var appointment_entity_1 = require("../entities/appointment.entity");
var appointments_module_1 = require("../appointments.module");
var AppointmentSubscriber = function () {
    var _classDecorators = [(0, common_1.Injectable)(), (0, typeorm_1.EventSubscriber)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppointmentSubscriber = _classThis = /** @class */ (function () {
        function AppointmentSubscriber_1(connection, eventEmitter) {
            this.eventEmitter = eventEmitter;
            // Register this subscriber with the connection
            connection.subscribers.push(this);
        }
        // Specify the entity type this subscriber listens to
        AppointmentSubscriber_1.prototype.listenTo = function () {
            return appointment_entity_1.Appointment;
        };
        // Handle appointment creation events
        AppointmentSubscriber_1.prototype.afterInsert = function (event) {
            var appointment = event.entity;
            if (appointment) {
                this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.CREATED, {
                    appointment: appointment,
                    timestamp: new Date(),
                });
            }
        };
        // Handle appointment update events
        AppointmentSubscriber_1.prototype.afterUpdate = function (event) {
            var _a, _b;
            var appointment = event.entity;
            if (!appointment)
                return;
            // Get the old and new values
            var oldStatus = (_a = event.databaseEntity) === null || _a === void 0 ? void 0 : _a.status;
            var newStatus = appointment.status;
            // Determine what type of update occurred
            if (oldStatus !== newStatus) {
                switch (newStatus) {
                    case 'cancelled':
                        this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.CANCELLED, {
                            appointment: appointment,
                            previousStatus: oldStatus,
                            timestamp: new Date(),
                        });
                        break;
                    case 'completed':
                        this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.COMPLETED, {
                            appointment: appointment,
                            previousStatus: oldStatus,
                            timestamp: new Date(),
                        });
                        break;
                    default:
                        // For general updates and reschedules
                        var oldDate = (_b = event.databaseEntity) === null || _b === void 0 ? void 0 : _b.scheduledFor;
                        var newDate = appointment.scheduledFor;
                        if (oldDate && newDate && oldDate.getTime() !== newDate.getTime()) {
                            this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.RESCHEDULED, {
                                appointment: appointment,
                                previousDate: oldDate,
                                timestamp: new Date(),
                            });
                        }
                        else {
                            this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.UPDATED, {
                                appointment: appointment,
                                timestamp: new Date(),
                            });
                        }
                }
            }
            else {
                // General update event
                this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.UPDATED, {
                    appointment: appointment,
                    timestamp: new Date(),
                });
            }
        };
        // Handle appointment removal events (soft delete)
        AppointmentSubscriber_1.prototype.afterSoftRemove = function (event) {
            var appointment = event.entity;
            if (appointment) {
                this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.CANCELLED, {
                    appointment: appointment,
                    timestamp: new Date(),
                    reason: 'deleted',
                });
            }
        };
        return AppointmentSubscriber_1;
    }());
    __setFunctionName(_classThis, "AppointmentSubscriber");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppointmentSubscriber = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppointmentSubscriber = _classThis;
}();
exports.AppointmentSubscriber = AppointmentSubscriber;
//# sourceMappingURL=appointment.subscriber.js.map