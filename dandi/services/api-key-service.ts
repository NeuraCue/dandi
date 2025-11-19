import { supabase } from "@/lib/supabase";
import { ApiKey, ApiKeyFormData } from "@/types/api-key";
import { transformApiKeyFromDatabase, transformApiKeyToDatabase } from "@/utils/api-key-transformer";
import { generateApiKey } from "@/utils/api-key-generator";
import { validateApiKeyForm, ValidationError } from "@/utils/validation";

/**
 * Custom error class for API key service errors
 */
export class ApiKeyServiceError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = "ApiKeyServiceError";
  }
}

/**
 * Service layer for API key operations
 * Dependency Inversion: Components depend on this abstraction, not Supabase directly
 * Single Responsibility: Handles all API key CRUD operations
 */
export class ApiKeyService {
  /**
   * Fetches all API keys
   */
  async fetchAll(): Promise<ApiKey[]> {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new ApiKeyServiceError(
          `Failed to fetch API keys: ${error.message}`,
          error
        );
      }

      return (data || []).map(transformApiKeyFromDatabase);
    } catch (error) {
      if (error instanceof ApiKeyServiceError) {
        throw error;
      }
      throw new ApiKeyServiceError(
        "An unexpected error occurred while fetching API keys",
        error
      );
    }
  }

  /**
   * Creates a new API key
   */
  async create(formData: ApiKeyFormData): Promise<void> {
    try {
      // Validate form data
      validateApiKeyForm(formData);

      const newKeyValue = generateApiKey(formData.type);
      const dbData = transformApiKeyToDatabase({
        name: formData.name,
        key: newKeyValue,
        type: formData.type,
        usage: 0,
        limitMonthlyUsage: formData.limitMonthlyUsage,
        monthlyUsageLimit: formData.monthlyUsageLimit,
        piiRestrictions: formData.piiRestrictions,
      });

      const { error } = await supabase.from("api_keys").insert(dbData);

      if (error) {
        throw new ApiKeyServiceError(
          `Failed to create API key: ${error.message}`,
          error
        );
      }
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ApiKeyServiceError) {
        throw error;
      }
      throw new ApiKeyServiceError(
        "An unexpected error occurred while creating API key",
        error
      );
    }
  }

  /**
   * Updates an existing API key
   */
  async update(id: string, formData: ApiKeyFormData): Promise<void> {
    try {
      // Validate form data
      validateApiKeyForm(formData);

      if (!id) {
        throw new ValidationError("API key ID is required");
      }

      const dbData = transformApiKeyToDatabase({
        name: formData.name,
        type: formData.type,
        limitMonthlyUsage: formData.limitMonthlyUsage,
        monthlyUsageLimit: formData.monthlyUsageLimit,
        piiRestrictions: formData.piiRestrictions,
      });

      const { error } = await supabase
        .from("api_keys")
        .update(dbData)
        .eq("id", id);

      if (error) {
        throw new ApiKeyServiceError(
          `Failed to update API key: ${error.message}`,
          error
        );
      }
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ApiKeyServiceError) {
        throw error;
      }
      throw new ApiKeyServiceError(
        "An unexpected error occurred while updating API key",
        error
      );
    }
  }

  /**
   * Deletes an API key
   */
  async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new ValidationError("API key ID is required");
      }

      const { error } = await supabase.from("api_keys").delete().eq("id", id);

      if (error) {
        throw new ApiKeyServiceError(
          `Failed to delete API key: ${error.message}`,
          error
        );
      }
    } catch (error) {
      if (error instanceof ValidationError || error instanceof ApiKeyServiceError) {
        throw error;
      }
      throw new ApiKeyServiceError(
        "An unexpected error occurred while deleting API key",
        error
      );
    }
  }
}

// Export singleton instance
export const apiKeyService = new ApiKeyService();
