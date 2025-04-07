import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, ValidateNested, IsArray, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export enum CommentVisibility {
    PUBLIC = 'public',
    INTERNAL = 'internal',
    PRIVATE = 'private'
}

export class CommentAttachment {
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsNotEmpty()
    fileSize: number;

    @IsString()
    @IsNotEmpty()
    mimeType: string;

    @IsString()
    @IsNotEmpty()
    fileUrl: string;
}

export class CreateTicketCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;
    isInternal: boolean;


    @IsEnum(CommentVisibility)
    @IsOptional()
    visibility?: CommentVisibility;


    @IsUUID()
    @IsOptional()
    parentId?: string;


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommentAttachment)
    @IsOptional()
    attachments?: CommentAttachment[];


    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    mentionedUserIds?: string[];


    @IsBoolean()
    @IsOptional()
    sendNotifications?: boolean;
}

export class UpdateTicketCommentDto {
    @IsString()
    @IsOptional()
    content?: string;


    @IsEnum(CommentVisibility)
    @IsOptional()
    visibility?: CommentVisibility;


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommentAttachment)
    @IsOptional()
    attachments?: CommentAttachment[];
}

export class TicketCommentResponseDto {
    id: string;


    ticketId: string;


    authorId: string;

    content: string;


    visibility: CommentVisibility;


    parentId?: string;


    attachments: CommentAttachment[];


    mentionedUserIds: string[];


    createdAt: Date;


    updatedAt?: Date;


    deletedAt?: Date;


    isEdited: boolean;


    replyCount: number;
}