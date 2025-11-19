import { supabase } from "@/lib/supabase";

/**
 * Service for API key validation
 * Single Responsibility: Handles API key validation logic
 */
export class ApiKeyValidationService {
  /**
   * Validates if an API key exists in the Supabase database
   * Queries the api_keys table to check if the provided key exists
   * @param apiKey The API key to validate
   * @returns true if the key exists in the database, false otherwise
   */
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey || apiKey.trim().length === 0) {
        return false;
      }

      // Query Supabase api_keys table to check if key exists
      const { data, error } = await supabase
        .from("api_keys")
        .select("id")
        .eq("key", apiKey.trim())
        .single();

      // If error (including "not found"), key is invalid
      if (error) {
        // PGRST116 means no rows found - this is expected for invalid keys
        if (error.code === "PGRST116") {
          return false;
        }
        // Other errors (network, permissions, etc.) also mean invalid
        console.error("Error validating API key:", error);
        return false;
      }

      // If data exists, key is valid
      return !!data;
    } catch (error) {
      console.error("Unexpected error validating API key:", error);
      return false;
    }
  }
}

// Export singleton instance
export const apiKeyValidationService = new ApiKeyValidationService();
