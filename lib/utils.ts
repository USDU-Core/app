import { type ClassValue, clsx } from 'clsx'

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format address for display
export function formatAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

// Format number with commas
export function formatNumber(num: number | string): string {
  return new Intl.NumberFormat().format(Number(num))
}

// Format currency
export function formatCurrency(amount: number | string, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(Number(amount))
}

// Sleep utility
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Check if running on client side
export const isClient = typeof window !== 'undefined'

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient || !navigator.clipboard) {
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

// Format large numbers with K/M suffixes
export function formatValue(value: string | null, prefix: string = '$', suffix: string = ''): string {
  if (!value) return '...';
  
  const num = parseFloat(value);
  if (isNaN(num)) return 'Error';
  
  if (num >= 1e6) {
    return `${prefix}${(num / 1e6).toFixed(1)}M${suffix}`;
  } else if (num >= 1e3) {
    return `${prefix}${(num / 1e3).toFixed(1)}K${suffix}`;
  } else {
    return `${prefix}${num.toFixed(2)}${suffix}`;
  }
}

// Format price values with specific decimal precision
export function formatPrice(value: string | null, decimals: number = 3): string {
  if (!value) return '...';
  
  const num = parseFloat(value);
  if (isNaN(num)) return 'Error';
  
  return `$${num.toFixed(decimals)}`;
}

// Format values with loading and error state handling
export function formatValueWithState(
  value: string | null,
  isLoading: boolean,
  error: string | null,
  prefix: string = '$',
  suffix: string = ''
): string {
  if (isLoading) return '...';
  if (error) return 'Error';
  return formatValue(value, prefix, suffix);
}

// Format prices with loading and error state handling
export function formatPriceWithState(
  value: string | null,
  isLoading: boolean,
  error: string | null,
  decimals: number = 3
): string {
  if (isLoading) return '...';
  if (error) return 'Error';
  return formatPrice(value, decimals);
}