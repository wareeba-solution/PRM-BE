"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DratchioClient = void 0;
var DratchioClient = /** @class */ (function () {
    function DratchioClient(config) {
        console.log('Dratchio client initialized with config:', config);
    }
    DratchioClient.prototype.on = function (event, callback) {
        console.log("Registered handler for event: ".concat(event));
        return this;
    };
    DratchioClient.prototype.register = function () {
        console.log('Mock SIP registration called');
        return Promise.resolve();
    };
    DratchioClient.prototype.call = function (options) {
        console.log('Mock call placed:', options);
        return Promise.resolve({
            uuid: "mock-call-".concat(Date.now()),
            answer: function () { return console.log('Call answered'); },
            hangup: function () { return console.log('Call hung up'); }
        });
    };
    return DratchioClient;
}());
exports.DratchioClient = DratchioClient;
//# sourceMappingURL=index.js.map