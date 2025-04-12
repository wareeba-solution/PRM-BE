export declare class ValidationUtil {
    /**
     * Email validation
     */
    static isValidEmail(email: string): boolean;
    /**
     * Phone number validation (international format)
     */
    static isValidPhoneNumber(phone: string): boolean;
    /**
     * Password strength validation
     */
    static isValidPassword(password: string): {
        isValid: boolean;
        errors: string[];
    };
    /**
     * Medical license number validation
     */
    static isValidLicenseNumber(license: string): boolean;
    /**
     * National ID validation
     */
    static isValidNationalId(id: string): boolean;
    /**
     * Insurance policy number validation
     */
    static isValidPolicyNumber(policy: string): boolean;
    /**
     * URL validation
     */
    static isValidUrl(url: string): boolean;
    /**
     * UUID validation
     */
    static isValidUUID(uuid: string): boolean;
    /**
     * Age validation
     */
    static isValidAge(birthDate: Date, minAge?: number, maxAge?: number): boolean;
    /**
     * Blood type validation
     */
    static isValidBloodType(bloodType: string): boolean;
    /**
     * Postal code validation
     */
    static isValidPostalCode(code: string, countryCode?: string): boolean;
    /**
     * Credit card validation (Luhn algorithm)
     */
    static isValidCreditCard(number: string): boolean;
    /**
     * Currency amount validation
     */
    static isValidCurrencyAmount(amount: string): boolean;
    /**
     * Time format validation (24-hour)
     */
    static isValidTime(time: string): boolean;
    /**
     * RGB color validation
     */
    static isValidRGBColor(color: string): boolean;
}
