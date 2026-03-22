/**
 * Format a price string as USD currency
 * "100000" → "$100,000"
 * Already formatted prices (with $) are returned as-is
 */
export function formatPrice(price: string): string {
  if (!price || price.includes('$')) {
    return price;
  }

  const num = parseFloat(price.replace(/,/g, ''));
  if (isNaN(num)) {
    return price;
  }

  return '$' + num.toLocaleString('en-US', {
    maximumFractionDigits: 0
  });
}

/**
 * Parse a formatted price back to a raw number string
 * "$100,000" → "100000"
 */
export function parsePrice(price: string): string {
  if (!price) return '';
  return price.replace(/[$,]/g, '');
}

/**
 * Format a number string with commas
 * "1000" → "1,000"
 * Empty/invalid returns "--"
 */
export function formatNumber(value: string): string {
  if (!value || value === '--') return '--';

  const num = parseFloat(value.replace(/,/g, ''));
  if (isNaN(num)) return '--';

  return num.toLocaleString('en-US', {
    maximumFractionDigits: 0
  });
}

/**
 * Format ISO date to short display: "2025-03-25" → "3/25"
 * Parses date string directly to avoid UTC timezone shift
 */
export function formatOpenHouseDate(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return '';
  return `${month}/${day}`;
}

/**
 * Format 24h time to 12h display: "14:00" → "2pm"
 */
export function formatOpenHouseTime(time24: string): string {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  if (isNaN(hours)) return '';

  const period = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 || 12;

  // Only show minutes if not :00
  if (minutes && minutes !== 0) {
    return `${hour12}:${minutes.toString().padStart(2, '0')}${period}`;
  }
  return `${hour12}${period}`;
}

/**
 * Format open house for display: "3/25 2pm-4pm"
 */
export function formatOpenHouse(date: string, startTime: string, endTime: string): string {
  const formattedDate = formatOpenHouseDate(date);
  const formattedStart = formatOpenHouseTime(startTime);
  const formattedEnd = formatOpenHouseTime(endTime);

  if (!formattedDate) return '';
  if (!formattedStart || !formattedEnd) return formattedDate;

  return `${formattedDate} ${formattedStart}-${formattedEnd}`;
}
