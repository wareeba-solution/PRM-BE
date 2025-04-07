import { CreateTicketDto } from './create-ticket.dto';
import { TicketStatus } from '../enums/ticket-status.enum';
declare const UpdateTicketDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateTicketDto, "type" | "source">>>;
export declare class UpdateTicketDto extends UpdateTicketDto_base {
    status?: TicketStatus;
    statusNote?: string;
    resolution?: string;
}
export {};
