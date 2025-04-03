"use strict";
// src/utils/validation.util.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtil = void 0;
var ValidationUtil = /** @class */ (function () {
    function ValidationUtil() {
    }
    /**
     * Email validation
     */
    ValidationUtil.isValidEmail = function (email) {
        var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };
    /**
     * Phone number validation (international format)
     */
    ValidationUtil.isValidPhoneNumber = function (phone) {
        var pattern = /^\+?[1-9]\d{1,14}$/;
        return pattern.test(phone.replace(/[\s-()]/g, ''));
    };
    /**
     * Password strength validation
     */
    ValidationUtil.isValidPassword = function (password) {
        var errors = [];
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push('Password must contain at least one special character (!@#$%^&*)');
        }
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    };
    /**
     * Medical license number validation
     */
    ValidationUtil.isValidLicenseNumber = function (license) {
        // Format: 2 letters followed by 6 digits
        var pattern = /^[A-Z]{2}\d{6}$/;
        return pattern.test(license);
    };
    /**
     * National ID validation
     */
    ValidationUtil.isValidNationalId = function (id) {
        // Format: 9 digits followed by 1 letter or digit
        var pattern = /^\d{9}[A-Z0-9]$/;
        return pattern.test(id);
    };
    /**
     * Insurance policy number validation
     */
    ValidationUtil.isValidPolicyNumber = function (policy) {
        // Format: 3 letters followed by 9 digits
        var pattern = /^[A-Z]{3}\d{9}$/;
        return pattern.test(policy);
    };
    /**
     * URL validation
     */
    ValidationUtil.isValidUrl = function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    /**
     * UUID validation
     */
    ValidationUtil.isValidUUID = function (uuid) {
        var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return pattern.test(uuid);
    };
    /**
     * Age validation
     */
    ValidationUtil.isValidAge = function (birthDate, minAge, maxAge) {
        if (minAge === void 0) { minAge = 0; }
        if (maxAge === void 0) { maxAge = 150; }
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= minAge && age <= maxAge;
    };
    /**
     * Blood type validation
     */
    ValidationUtil.isValidBloodType = function (bloodType) {
        var validTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return validTypes.includes(bloodType);
    };
    /**
     * Postal code validation
     */
    ValidationUtil.isValidPostalCode = function (code, countryCode) {
        var _a, _b;
        if (countryCode === void 0) { countryCode = 'US'; }
        var patterns = {
            US: /^\d{5}(-\d{4})?$/,
            UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
            CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
            // Add more country patterns as needed
        };
        return (_b = (_a = patterns[countryCode]) === null || _a === void 0 ? void 0 : _a.test(code)) !== null && _b !== void 0 ? _b : false;
    };
    /**
     * Credit card validation (Luhn algorithm)
     */
    ValidationUtil.isValidCreditCard = function (number) {
        var digits = number.replace(/\D/g, '');
        if (digits.length < 13 || digits.length > 19) {
            return false;
        }
        var sum = 0;
        var isEven = false;
        for (var i = digits.length - 1; i >= 0; i--) {
            var digit = parseInt(digits[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    };
    /**
     * Currency amount validation
     */
    ValidationUtil.isValidCurrencyAmount = function (amount) {
        var pattern = /^\d+(\.\d{1,2})?$/;
        return pattern.test(amount);
    };
    /**
     * Time format validation (24-hour)
     */
    ValidationUtil.isValidTime = function (time) {
        var pattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return pattern.test(time);
    };
    /**
     * RGB color validation
     */
    ValidationUtil.isValidRGBColor = function (color) {
        var pattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
        if (!pattern.test(color))
            return false;
        var _a = color.match(pattern) || [], _ = _a[0], r = _a[1], g = _a[2], b = _a[3];
        return [r, g, b].every(function (val) { return parseInt(val) >= 0 && parseInt(val) <= 255; });
    };
    return ValidationUtil;
}());
exports.ValidationUtil = ValidationUtil;
//# sourceMappingURL=validation.util.js.map