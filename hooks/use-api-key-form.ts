import { useState, useCallback } from "react";
import { ApiKey, ApiKeyFormData } from "@/types/api-key";
import { apiKeyService, ApiKeyServiceError } from "@/services/api-key-service";
import { ValidationError } from "@/utils/validation";

interface UseApiKeyFormOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Custom hook for managing API key form state and submission
 * Single Responsibility: Handles form state and submission logic
 */
export function useApiKeyForm(options: UseApiKeyFormOptions = {}) {
  const [formData, setFormData] = useState<ApiKeyFormData>({
    name: "",
    type: "dev",
    limitMonthlyUsage: false,
    monthlyUsageLimit: 1000,
    piiRestrictions: false,
  });
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      type: "dev",
      limitMonthlyUsage: false,
      monthlyUsageLimit: 1000,
      piiRestrictions: false,
    });
    setEditingKey(null);
    setError(null);
  }, []);

  const initializeForm = useCallback((key: ApiKey) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      type: key.type,
      limitMonthlyUsage: key.limitMonthlyUsage,
      monthlyUsageLimit: key.monthlyUsageLimit || 1000,
      piiRestrictions: key.piiRestrictions,
    });
    setError(null);
  }, []);

  const submitForm = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingKey) {
        await apiKeyService.update(editingKey.id, formData);
      } else {
        await apiKeyService.create(formData);
      }

      resetForm();
      options.onSuccess?.();
    } catch (err) {
      let errorMessage = "Failed to save API key";
      
      if (err instanceof ValidationError) {
        errorMessage = err.message;
      } else if (err instanceof ApiKeyServiceError) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      options.onError?.(errorMessage);
      console.error("Error saving API key:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingKey, options, resetForm]);

  const updateFormField = useCallback(
    <K extends keyof ApiKeyFormData>(
      field: K,
      value: ApiKeyFormData[K]
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  return {
    formData,
    editingKey,
    isSubmitting,
    error,
    setFormData,
    updateFormField,
    initializeForm,
    resetForm,
    submitForm,
  };
}
