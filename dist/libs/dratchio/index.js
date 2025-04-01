export class DratchioClient {
    constructor(config) {
        console.log('Dratchio client initialized with config:', config);
    }
    on(event, callback) {
        console.log(`Registered handler for event: ${event}`);
        return this;
    }
    register() {
        console.log('Mock SIP registration called');
        return Promise.resolve();
    }
    call(options) {
        console.log('Mock call placed:', options);
        return Promise.resolve({
            uuid: `mock-call-${Date.now()}`,
            answer: () => console.log('Call answered'),
            hangup: () => console.log('Call hung up')
        });
    }
}
//# sourceMappingURL=index.js.map