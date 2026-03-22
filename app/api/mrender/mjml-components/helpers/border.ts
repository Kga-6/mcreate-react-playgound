/**
 * Interface for parsed border
 */
export interface ParsedBorder {
  width: number;  // 0-50
  style: string;  // "solid"
  color: string;  // "#RRGGBB"
}

/**
 * Default border values
 */
const DEFAULT_BORDER: ParsedBorder = {
  width: 0,
  style: 'solid',
  color: '#000000',
};

/**
 * Parse border shorthand string to structured object
 * Handles: "4px solid #FF0000" → { width: 4, style: 'solid', color: '#FF0000' }
 * Handles: "0px" → { width: 0, style: 'solid', color: '#000000' }
 * Handles: "none" → { width: 0, style: 'solid', color: '#000000' }
 */
export const parseBorder = (value: string | undefined | null): ParsedBorder => {
  if (!value || value === 'none') return { ...DEFAULT_BORDER };

  // Handle simple "0px" case
  if (/^\d+px$/.test(value.trim())) {
    const width = parseInt(value, 10);
    return { ...DEFAULT_BORDER, width: Math.max(0, Math.min(50, width)) };
  }

  // Parse full shorthand: "4px solid #FF0000"
  const match = value.match(/^(\d+)px\s+(\w+)\s+(#[0-9A-Fa-f]{3,6})$/);
  if (match) {
    return {
      width: Math.max(0, Math.min(50, parseInt(match[1], 10))),
      style: match[2],
      color: match[3].toUpperCase(),
    };
  }

  return { ...DEFAULT_BORDER };
};

/**
 * Format structured border to CSS shorthand string
 * { width: 4, style: 'solid', color: '#FF0000' } → "4px solid #FF0000"
 */
export const formatBorder = (border: ParsedBorder): string => {
  const clampedWidth = Math.max(0, Math.min(50, border.width));
  return `${clampedWidth}px ${border.style} ${border.color}`;
};

/**
 * Check if border is enabled (width > 0)
 */
export const isBorderEnabled = (value: string | undefined | null): boolean => {
  const parsed = parseBorder(value);
  return parsed.width > 0;
};
