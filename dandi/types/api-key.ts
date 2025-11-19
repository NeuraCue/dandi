export type ApiKeyType = "dev" | "prod";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: ApiKeyType;
  usage: number;
  monthlyUsageLimit?: number;
  limitMonthlyUsage: boolean;
  piiRestrictions: boolean;
  createdAt: string;
}

export interface ApiKeyFormData {
  name: string;
  type: ApiKeyType;
  limitMonthlyUsage: boolean;
  monthlyUsageLimit: number;
  piiRestrictions: boolean;
}

export interface ApiKeyDatabaseRow {
  id: string;
  name: string;
  key: string;
  type: ApiKeyType;
  usage: number;
  monthly_usage_limit?: number;
  limit_monthly_usage: boolean;
  pii_restrictions: boolean;
  created_at: string;
}
