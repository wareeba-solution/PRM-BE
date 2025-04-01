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
import { EventSubscriber, Connection, } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentEventTypes } from '../appointments.module';
let AppointmentSubscriber = class AppointmentSubscriber {
    constructor(connection, eventEmitter) {
        this.eventEmitter = eventEmitter;
        connection.subscribers.push(this);
    }
    listenTo() {
        return Appointment;
    }
    afterInsert(event) {
        const appointment = event.entity;
        if (appointment) {
            this.eventEmitter.emit(AppointmentEventTypes.CREATED, {
                appointment,
                timestamp: new Date(),
            });
        }
    }
    afterUpdate(event) {
        var _a, _b;
        const appointment = event.entity;
        if (!appointment)
            return;
        const oldStatus = (_a = event.databaseEntity) === null || _a === void 0 ? void 0 : _a.status;
        const newStatus = appointment.status;
        if (oldStatus !== newStatus) {
            switch (newStatus) {
                case 'cancelled':
                    this.eventEmitter.emit(AppointmentEventTypes.CANCELLED, {
                        appointment,
                        previousStatus: oldStatus,
                        timestamp: new Date(),
                    });
                    break;
                case 'completed':
                    this.eventEmitter.emit(AppointmentEventTypes.COMPLETED, {
                        appointment,
                        previousStatus: oldStatus,
                        timestamp: new Date(),
                    });
                    break;
                default:
                    const oldDate = (_b = event.databaseEntity) === null || _b === void 0 ? void 0 : _b.scheduledFor;
                    const newDate = appointment.scheduledFor;
                    if (oldDate && newDate && oldDate.getTime() !== newDate.getTime()) {
                        this.eventEmitter.emit(AppointmentEventTypes.RESCHEDULED, {
                            appointment,
                            previousDate: oldDate,
                            timestamp: new Date(),
                        });
                    }
                    else {
                        this.eventEmitter.emit(AppointmentEventTypes.UPDATED, {
                            appointment,
                            timestamp: new Date(),
                        });
                    }
            }
        }
        else {
            this.eventEmitter.emit(AppointmentEventTypes.UPDATED, {
                appointment,
                timestamp: new Date(),
            });
        }
    }
    afterSoftRemove(event) {
        const appointment = event.entity;
        if (appointment) {
            this.eventEmitter.emit(AppointmentEventTypes.CANCELLED, {
                appointment,
                timestamp: new Date(),
                reason: 'deleted',
            });
        }
    }
};
AppointmentSubscriber = __decorate([
    Injectable(),
    EventSubscriber(),
    __param(0, InjectConnection()),
    __metadata("design:paramtypes", [Connection,
        EventEmitter2])
], AppointmentSubscriber);
export { AppointmentSubscriber };
//# sourceMappingURL=appointment.subscriber.js.map