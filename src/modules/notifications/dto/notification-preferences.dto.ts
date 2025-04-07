import {
    IsEnum,
    IsBoolean,
    IsOptional,
    IsString,
    IsArray,
    IsInt,
    Min,
    Max,
    ValidateNested,
    IsDateString,
    IsObject,
    Matches,
    ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationChannel, NotificationCategory, NotificationFrequency } from '../entities/notification-preference.entity';
import { ChannelSettingsDto } from './channel-settings.dto';

export class NotificationPreferencesDto {
    category: NotificationCategory;
    channels: NotificationChannel[];
    frequency: NotificationFrequency;
    enabled?: boolean;
    startTime?: string;
    endTime?: string;
    workDays?: string[];
    customSchedule?: {
        days: string[];
        times: string[];
        timezone: string;
    };
    channelSpecificSettings?: ChannelSettingsDto;
    filters?: {
        priority?: string[];
        status?: string[];
        types?: string[];
        senders?: string[];
        keywords?: string[];
        excludeKeywords?: string[];
    };
    importanceThreshold?: number;
    muteAll?: boolean;
    muteUntil?: Date;
    digestSettings?: {
        groupBy?: string[];
        sortBy?: string;
        maxItems?: number;
        format?: string;
    };
    allowReminders?: boolean;
    reminderInterval?: number;
    maxReminders?: number;
    
    // Column configuration
    enabledChannels: NotificationChannel[];
}

export class CreateNotificationPreferenceDto {
    @IsEnum(NotificationCategory)
    category: NotificationCategory;

    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    @ArrayMinSize(1)
    channels: NotificationChannel[];

    @IsEnum(NotificationFrequency)
    frequency: NotificationFrequency;

    @IsOptional()
    @IsBoolean()
    enabled?: boolean;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format'
    })
    startTime?: string;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format'
    })
    endTime?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    workDays?: string[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CustomScheduleDto)
    customSchedule?: {
        days: string[];
        times: string[];
        timezone: string;
    };

    @IsOptional()
    @ValidateNested()
    @Type(() => ChannelSettingsDto)
    channelSpecificSettings?: ChannelSettingsDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => NotificationFiltersDto)
    filters?: {
        priority?: string[];
        status?: string[];
        types?: string[];
        senders?: string[];
        keywords?: string[];
        excludeKeywords?: string[];
    };

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    importanceThreshold?: number;

    @IsOptional()
    @IsBoolean()
    muteAll?: boolean;

    @IsOptional()
    @IsDateString()
    muteUntil?: Date;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => DigestSettingsDto)
    digestSettings?: {
        groupBy?: string[];
        sortBy?: string;
        maxItems?: number;
        format?: string;
    };

    @IsOptional()
    @IsBoolean()
    allowReminders?: boolean;

    @IsOptional()
    @IsInt()
    @Min(1)
    reminderInterval?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    maxReminders?: number;

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}

// Supporting DTOs for nested validation
class CustomScheduleDto {
    @IsArray()
    @IsString({ each: true })
    days: string[];

    @IsArray()
    @IsString({ each: true })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Times must be in HH:mm format',
        each: true
    })
    times: string[];

    @IsString()
    timezone: string;
}

class NotificationFiltersDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    priority?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    status?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    types?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    senders?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    keywords?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    excludeKeywords?: string[];
}

class DigestSettingsDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    groupBy?: string[];

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    maxItems?: number;

    @IsOptional()
    @IsString()
    format?: string;
}

export class UpdateNotificationPreferenceDto {
    @IsOptional()
    @IsEnum(NotificationCategory)
    category?: NotificationCategory;

    @IsOptional()
    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    channels?: NotificationChannel[];

    @IsOptional()
    @IsEnum(NotificationFrequency)
    frequency?: NotificationFrequency;

    @IsOptional()
    @IsBoolean()
    enabled?: boolean;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format'
    })
    startTime?: string;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format'
    })
    endTime?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    workDays?: string[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CustomScheduleDto)
    customSchedule?: {
        days: string[];
        times: string[];
        timezone: string;
    };

    @IsOptional()
    @ValidateNested()
    @Type(() => ChannelSettingsDto)
    channelSpecificSettings?: ChannelSettingsDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => NotificationFiltersDto)
    filters?: {
        priority?: string[];
        status?: string[];
        types?: string[];
        senders?: string[];
        keywords?: string[];
        excludeKeywords?: string[];
    };

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    importanceThreshold?: number;

    @IsOptional()
    @IsBoolean()
    muteAll?: boolean;

    @IsOptional()
    @IsDateString()
    muteUntil?: Date;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => DigestSettingsDto)
    digestSettings?: {
        groupBy?: string[];
        sortBy?: string;
        maxItems?: number;
        format?: string;
    };

    @IsOptional()
    @IsBoolean()
    allowReminders?: boolean;

    @IsOptional()
    @IsInt()
    @Min(1)
    reminderInterval?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(10)
    maxReminders?: number;

    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}