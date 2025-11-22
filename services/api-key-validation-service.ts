/**
 * Service for API key validation
 * Single Responsibility: Handles API key validation logic
 * Uses the /api/validate-key endpoint for validation
 */
export class ApiKeyValidationService {
  /**
   * Validates if an API key exists in the database
   * Calls the /api/validate-key endpoint which queries Supabase
   * @param apiKey The API key to validate
   * @returns true if the key exists in the database, false otherwise
   */
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey || apiKey.trim().length === 0) {
        return false;
      }

      // Call the API endpoint to validate the key
      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const data = await response.json();
      return data.valid === true;
    } catch (error) {
      console.error("Unexpected error validating API key:", error);
      return false;
    }
  }
}

// Export singleton instance
export const apiKeyValidationService = new ApiKeyValidationService();
