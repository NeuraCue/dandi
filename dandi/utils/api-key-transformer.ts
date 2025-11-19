import { ApiKey, ApiKeyDatabaseRow } from "@/types/api-key";

/**
 * Transforms database row format to application format
 * Separates data transformation logic (Single Responsibility)
 */
export function transformApiKeyFromDatabase(row: ApiKeyDatabaseRow): ApiKey {
  return {
    id: row.id,
    name: row.name,
    key: row.key,
    type: row.type,
    usage: row.usage || 0,
    monthlyUsageLimit: row.monthly_usage_limit,
    limitMonthlyUsage: row.limit_monthly_usage || false,
    piiRestrictions: row.pii_restrictions || false,
    createdAt: new Date(row.created_at).toISOString().split("T")[0],
  };
}

/**
 * Transforms application format to database format
 */
export function transformApiKeyToDatabase(
  apiKey: Partial<ApiKey>
): Partial<ApiKeyDatabaseRow> {
  const dbRow: Partial<ApiKeyDatabaseRow> = {};

  if (apiKey.name !== undefined) dbRow.name = apiKey.name;
  if (apiKey.type !== undefined) dbRow.type = apiKey.type;
  if (apiKey.key !== undefined) dbRow.key = apiKey.key;
  if (apiKey.usage !== undefined) dbRow.usage = apiKey.usage;
  if (apiKey.monthlyUsageLimit !== undefined)
    dbRow.monthly_usage_limit = apiKey.monthlyUsageLimit;
  if (apiKey.limitMonthlyUsage !== undefined)
    dbRow.limit_monthly_usage = apiKey.limitMonthlyUsage;
  if (apiKey.piiRestrictions !== undefined)
    dbRow.pii_restrictions = apiKey.piiRestrictions;

  return dbRow;
}
