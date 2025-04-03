import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
/**
 * Entity for doctor's schedule exceptions (time off, vacations, etc.)
 */
export declare class ScheduleException {
    id: string;
    doctorId: string;
    doctor: User;
    organizationId: string;
    organization: Organization;
    startDate: Date;
    endDate: Date;
    startTime: Date | null;
    endTime: Date | null;
    isFullDay: boolean;
    type: string;
    reason: string;
    createdBy: string;
    creator: User;
    updatedBy: string;
    updater: User;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Check if a given datetime falls within the exception
     */
    isDateTimeInException(dateTime: Date): boolean;
}
