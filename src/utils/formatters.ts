export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEMI(price: number, months: number = 6): number {
  // No Cost EMI calculation: pure division
  return Math.round(price / months);
}

export function formatPincodeEstimate(pincode?: string): { city: string; state: string; days: number; isExpress: boolean } {
  const pin = (pincode || '').trim();
  if (!pin) {
    return { city: 'Select Pincode', state: 'India', days: 2, isExpress: false };
  }
  if (pin.startsWith('11') || pin.startsWith('40') || pin.startsWith('56') || pin.startsWith('60') || pin.startsWith('70') || pin.startsWith('50')) {
    return { city: 'Metro Hub', state: 'Tier 1 Region', days: 1, isExpress: true };
  }
  if (pin.startsWith('30') || pin.startsWith('80') || pin.startsWith('22') || pin.startsWith('45') || pin.startsWith('39') || pin.startsWith('64')) {
    return { city: 'Tier-2 Regional City', state: 'Fast Hub Area', days: 2, isExpress: true };
  }
  return { city: 'Standard Delivery Hub', state: 'Nationwide Delivery', days: 3, isExpress: false };
}
