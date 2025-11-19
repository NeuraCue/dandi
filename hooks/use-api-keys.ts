import { useState, useEffect, useCallback } from "react";
import { ApiKey } from "@/types/api-key";
import { apiKeyService } from "@/services/api-key-service";

/**
 * Custom hook for managing API keys
 * Single Responsibility: Handles API key data fetching and state management
 */
export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiKeyService.fetchAll();
      setApiKeys(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch API keys";
      setError(errorMessage);
      console.error("Error fetching API keys:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  return {
    apiKeys,
    loading,
    error,
    refetch: fetchApiKeys,
  };
}
