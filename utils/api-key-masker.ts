/**
 * Masks API key for display
 * Single Responsibility: Key masking logic only
 */
export function maskApiKey(key: string): string {
  if (key.length <= 12) return key;
  // Show prefix (e.g., "dandi-dev-") and mask the rest
  const prefixEnd = key.indexOf("-", key.indexOf("-") + 1) + 1;
  const prefix = key.substring(0, prefixEnd);
  return prefix + "************************";
}
