import { ValidationResult } from './FinancialTypes';

/**
 * Validation error information
 */
export interface ValidationError {
  /** Field that failed validation */
  field: string;
  /** Human-readable error message */
  message: string;
  /** Error code for programmatic handling */
  code: string;
}

// ValidationResult is imported from FinancialTypes.ts to avoid duplication

/**
 * Partner login form validation
 */
export interface PartnerLoginValidation {
  /** Email field validation */
  email: ValidationResult;
  /** Password field validation */
  password: ValidationResult;
  /** Overall form validation */
  overall: ValidationResult;
}

/**
 * Partner registration form validation
 */
export interface PartnerRegistrationValidation {
  /** Email field validation */
  email: ValidationResult;
  /** Password field validation */
  password: ValidationResult;
  /** First name field validation */
  firstName: ValidationResult;
  /** Last name field validation */
  lastName: ValidationResult;
  /** Phone field validation */
  phone: ValidationResult;
  /** Overall form validation */
  overall: ValidationResult;
}

/**
 * Partner profile form validation
 */
export interface PartnerProfileValidation {
  /** First name field validation */
  firstName: ValidationResult;
  /** Last name field validation */
  lastName: ValidationResult;
  /** Phone field validation */
  phone: ValidationResult;
  /** Address field validation */
  address: ValidationResult;
  /** Banking details validation */
  bankingDetails: ValidationResult;
  /** Overall form validation */
  overall: ValidationResult;
}