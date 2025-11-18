/**
 * Currency Models
 * 
 * Types for currency management and multi-currency support
 */

import { Currency } from '../enums/Currency';

export interface CurrencySettings {
  id: string;
  companyId?: string; // For provider-specific settings
  userId?: string; // For user-specific settings
  defaultCurrency: Currency;
  activeCurrencies: Currency[];
  exchangeRates: Record<Currency, number>; // Rates relative to PKR
  autoUpdateRates: boolean;
  lastRateUpdate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExchangeRate {
  id: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  source: string; // 'manual', 'api', 'bank'
  validFrom: Date;
  validTo?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CurrencyAmount {
  amount: number;
  currency: Currency;
  originalAmount?: number; // If converted from another currency
  originalCurrency?: Currency;
  exchangeRate?: number;
  convertedAt?: Date;
}

export interface MultiCurrencyAmount {
  primary: CurrencyAmount;
  converted?: CurrencyAmount[];
}

// Input types
export interface CreateCurrencySettingsInput {
  companyId?: string;
  userId?: string;
  defaultCurrency: Currency;
  activeCurrencies: Currency[];
  exchangeRates?: Record<Currency, number>;
  autoUpdateRates?: boolean;
}

export interface UpdateCurrencySettingsInput {
  defaultCurrency?: Currency;
  activeCurrencies?: Currency[];
  exchangeRates?: Record<Currency, number>;
  autoUpdateRates?: boolean;
}

export interface CreateExchangeRateInput {
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  source?: string;
  validFrom?: Date;
  validTo?: Date;
}

export interface UpdateExchangeRateInput {
  rate?: number;
  source?: string;
  validFrom?: Date;
  validTo?: Date;
  isActive?: boolean;
}

// Conversion utilities
export interface CurrencyConversionRequest {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  date?: Date; // For historical rates
}

export interface CurrencyConversionResponse {
  originalAmount: number;
  originalCurrency: Currency;
  convertedAmount: number;
  convertedCurrency: Currency;
  exchangeRate: number;
  convertedAt: Date;
}

// Display preferences
export interface CurrencyDisplayPreferences {
  showCurrencyCode: boolean;
  showCurrencySymbol: boolean;
  decimalPlaces: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbolPosition: 'before' | 'after';
}

export interface CurrencyFormatOptions {
  currency?: Currency;
  locale?: string;
  showSymbol?: boolean;
  showCode?: boolean;
  decimals?: number;
  preferences?: CurrencyDisplayPreferences;
}

// System configuration
export interface SystemCurrencyConfig {
  baseCurrency: Currency; // PKR
  supportedCurrencies: Currency[];
  defaultExchangeRates: Record<Currency, number>;
  rateUpdateInterval: number; // in minutes
  rateApiEndpoint?: string;
  rateApiKey?: string;
}

export const DEFAULT_SYSTEM_CONFIG: SystemCurrencyConfig = {
  baseCurrency: Currency.PKR,
  supportedCurrencies: [Currency.PKR, Currency.USD],
  defaultExchangeRates: {
    [Currency.PKR]: 1,
    [Currency.USD]: 0.0036,
    [Currency.EUR]: 0.0033,
    [Currency.GBP]: 0.0028,
    [Currency.AED]: 0.013,
    [Currency.SAR]: 0.013,
  },
  rateUpdateInterval: 60, // 1 hour
};