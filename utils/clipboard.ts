/**
 * Utility for clipboard operations
 * Single Responsibility: Clipboard operations only
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    throw new Error("Failed to copy to clipboard");
  }
}
