export declare class RedisMockService {
    private readonly logger;
    private cache;
    constructor();
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<'OK'>;
    del(key: string): Promise<number>;
    on(event: string, callback: Function): this;
}
