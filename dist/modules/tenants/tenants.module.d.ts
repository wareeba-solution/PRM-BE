import { MiddlewareConsumer, OnModuleInit, NestModule } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class TenantsModule implements OnModuleInit, NestModule {
    private dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    onModuleInit(): Promise<void>;
    configure(consumer: MiddlewareConsumer): void;
}
