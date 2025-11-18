/**
 * Currency Enums
 * 
 * Defines supported currencies and related enums
 */

export enum Currency {
  PKR = 'PKR',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  AED = 'AED',
  SAR = 'SAR',
}

export enum CurrencySymbol {
  PKR = 'Rs',
  USD = '$',
  EUR = '€',
  GBP = '£',
  AED = 'د.إ',
  SAR = 'ر.س',
}

export enum CurrencyPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export interface CurrencyConfig {
  code: Currency;
  symbol: CurrencySymbol;
  name: string;
  position: CurrencyPosition;
  decimals: number;
  locale: string;
  isDefault: boolean;
  isActive: boolean;
  exchangeRate?: number; // Rate relative to base currency (PKR)
}

export const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  [Currency.PKR]: {
    code: Currency.PKR,
    symbol: CurrencySymbol.PKR,
    name: 'Pakistani Rupee',
    position: CurrencyPosition.BEFORE,
    decimals: 2,
    locale: 'en-PK',
    isDefault: true,
    isActive: true,
  },
  [Currency.USD]: {
    code: Currency.USD,
    symbol: CurrencySymbol.USD,
    name: 'US Dollar',
    position: CurrencyPosition.BEFORE,
    decimals: 2,
    locale: 'en-US',
    isDefault: false,
    isActive: false, // Will be activated when needed
    exchangeRate: 0.0036, // 1 PKR = 0.0036 USD (example rate)
  },
  [Currency.EUR]: {
    code: Currency.EUR,
    symbol: CurrencySymbol.EUR,
    name: 'Euro',
    position: CurrencyPosition.BEFORE,
    decimals: 2,
    locale: 'de-DE',
    isDefault: false,
    isActive: false,
    exchangeRate: 0.0033, // 1 PKR = 0.0033 EUR (example rate)
  },
  [Currency.GBP]: {
    code: Currency.GBP,
    symbol: CurrencySymbol.GBP,
    name: 'British Pound',
    position: CurrencyPosition.BEFORE,
    decimals: 2,
    locale: 'en-GB',
    isDefault: false,
    isActive: false,
    exchangeRate: 0.0028, // 1 PKR = 0.0028 GBP (example rate)
  },
  [Currency.AED]: {
    code: Currency.AED,
    symbol: CurrencySymbol.AED,
    name: 'UAE Dirham',
    position: CurrencyPosition.AFTER,
    decimals: 2,
    locale: 'ar-AE',
    isDefault: false,
    isActive: false,
    exchangeRate: 0.013, // 1 PKR = 0.013 AED (example rate)
  },
  [Currency.SAR]: {
    code: Currency.SAR,
    symbol: CurrencySymbol.SAR,
    name: 'Saudi Riyal',
    position: CurrencyPosition.AFTER,
    decimals: 2,
    locale: 'ar-SA',
    isDefault: false,
    isActive: false,
    exchangeRate: 0.013, // 1 PKR = 0.013 SAR (example rate)
  },
};

export const DEFAULT_CURRENCY = Currency.PKR;
export const ACTIVE_CURRENCIES = Object.values(CURRENCY_CONFIGS).filter(config => config.isActive);