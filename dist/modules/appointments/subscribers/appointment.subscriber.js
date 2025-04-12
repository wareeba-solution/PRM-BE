"use strict";
// src/modules/appointments/subscribers/appointment.subscriber.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSubscriber = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const appointment_entity_1 = require("../entities/appointment.entity");
const appointments_module_1 = require("../appointments.module");
let AppointmentSubscriber = class AppointmentSubscriber {
    constructor(connection, eventEmitter) {
        this.eventEmitter = eventEmitter;
        // Register this subscriber with the connection
        connection.subscribers.push(this);
    }
    // Specify the entity type this subscriber listens to
    listenTo() {
        return appointment_entity_1.Appointment;
    }
    // Handle appointment creation events
    afterInsert(event) {
        const appointment = event.entity;
        if (appointment) {
            this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.CREATED, {
                appointment,
                timestamp: new Date(),
            });
        }
    }
    // Handle appointment update events
    afterUpdate(event) {
        var _a, _b;
        const appointment = event.entity;
        if (!appointment)
            return;
        // Get the old and new values
        const oldStatus = (_a = event.databaseEntity) === null || _a === void 0 ? void 0 : _a.status;
        const newStatus = appointment.status;
        // Determine what type of update occurred
        if (oldStatus !== newStatus) {
            switch (newStatus) {
                case 'cancelled':
                    this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.CANCELLED, {
                        appointment,
                        previousStatus: oldStatus,
                        timestamp: new Date(),
                    });
                    break;
                case 'completed':
                    this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.COMPLETED, {
                        appointment,
                        previousStatus: oldStatus,
                        timestamp: new Date(),
                    });
                    break;
                default:
                    // For general updates and reschedules
                    const oldDate = (_b = event.databaseEntity) === null || _b === void 0 ? void 0 : _b.startTime;
                    const newDate = appointment.scheduledFor;
                    if (oldDate && newDate && oldDate.getTime() !== newDate.getTime()) {
                        this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.RESCHEDULED, {
                            appointment,
                            previousDate: oldDate,
                            timestamp: new Date(),
                        });
                    }
                    else {
                        this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.UPDATED, {
                            appointment,
                            timestamp: new Date(),
                        });
                    }
            }
        }
        else {
            // General update event
            this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.UPDATED, {
                appointment,
                timestamp: new Date(),
            });
        }
    }
    // Handle appointment removal events (soft delete)
    afterSoftRemove(event) {
        const appointment = event.entity;
        if (appointment) {
            this.eventEmitter.emit(appointments_module_1.AppointmentEventTypes.CANCELLED, {
                appointment,
                timestamp: new Date(),
                reason: 'deleted',
            });
        }
    }
};
AppointmentSubscriber = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EventSubscriber)(),
    __param(0, (0, typeorm_2.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        event_emitter_1.EventEmitter2])
], AppointmentSubscriber);
exports.AppointmentSubscriber = AppointmentSubscriber;
//# sourceMappingURL=appointment.subscriber.js.map