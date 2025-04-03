"use strict";
// src/modules/auth/guards/rate-limit.guard.ts
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
var common_1 = require("@nestjs/common");
var RateLimitGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RateLimitGuard = _classThis = /** @class */ (function () {
        function RateLimitGuard_1() {
            // Rate limit configuration
            this.maxRequests = 100; // Maximum requests per window
            this.windowMs = 15 * 60 * 1000; // 15 minutes window
        }
        RateLimitGuard_1.prototype.canActivate = function (context) {
            var request = context.switchToHttp().getRequest();
            // Generate a key based on IP address
            var ip = this.getIp(request);
            var key = "".concat(ip);
            // Initialize or get the rate limit data for this key
            var now = Date.now();
            var data = RateLimitGuard.store[key] || { count: 0, lastRequest: now };
            // Reset count if outside window
            if (now - data.lastRequest > this.windowMs) {
                data.count = 0;
                data.lastRequest = now;
            }
            // Increment request count
            data.count += 1;
            // Update store
            RateLimitGuard.store[key] = data;
            // Set headers to inform client about rate limits
            var response = context.switchToHttp().getResponse();
            response.header('X-RateLimit-Limit', this.maxRequests);
            response.header('X-RateLimit-Remaining', Math.max(0, this.maxRequests - data.count));
            // Check if rate limit is exceeded
            if (data.count > this.maxRequests) {
                var resetTime = new Date(data.lastRequest + this.windowMs);
                response.header('X-RateLimit-Reset', resetTime.toISOString());
                throw new common_1.HttpException('Too Many Requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            return true;
        };
        /**
         * Get IP address from request, handling proxies
         */
        RateLimitGuard_1.prototype.getIp = function (request) {
            // Try X-Forwarded-For header first (for proxied requests)
            var forwardedFor = request.headers['x-forwarded-for'];
            if (forwardedFor) {
                return Array.isArray(forwardedFor)
                    ? forwardedFor[0]
                    : forwardedFor.split(',')[0].trim();
            }
            // Fall back to standard IP
            return request.ip || 'unknown';
        };
        return RateLimitGuard_1;
    }());
    __setFunctionName(_classThis, "RateLimitGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RateLimitGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    // Static store to track request counts across instances
    _classThis.store = {};
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RateLimitGuard = _classThis;
}();
exports.RateLimitGuard = RateLimitGuard;
//# sourceMappingURL=rate-limit.guard.js.map