import { ApiKeyFormData } from "@/types/api-key";

/**
 * Validation utilities
 * Single Responsibility: Handles form validation logic
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateApiKeyForm(formData: ApiKeyFormData): void {
  if (!formData.name || formData.name.trim().length === 0) {
    throw new ValidationError("Key name is required");
  }

  if (formData.name.length > 100) {
    throw new ValidationError("Key name must be less than 100 characters");
  }

  if (formData.limitMonthlyUsage) {
    if (
      !formData.monthlyUsageLimit ||
      formData.monthlyUsageLimit < 1 ||
      formData.monthlyUsageLimit > 1000000
    ) {
      throw new ValidationError(
        "Monthly usage limit must be between 1 and 1,000,000"
      );
    }
  }
}
