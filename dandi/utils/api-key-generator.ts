import { ApiKeyType } from "@/types/api-key";

/**
 * Generates a secure API key
 * Single Responsibility: Key generation logic only
 */
export function generateApiKey(type: ApiKeyType): string {
  const prefix = type === "prod" ? "dandi-prod-" : "dandi-dev-";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let random = "";
  for (let i = 0; i < 24; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + random;
}
