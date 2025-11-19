import { ApiKeyFormData } from "@/types/api-key";
import { Button } from "@/components/ui/Button";

interface ApiKeyFormProps {
  formData: ApiKeyFormData;
  editingKey: boolean;
  isSubmitting: boolean;
  onFieldChange: <K extends keyof ApiKeyFormData>(
    field: K,
    value: ApiKeyFormData[K]
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

/**
 * API Key form component
 * Single Responsibility: Renders the API key form
 */
export function ApiKeyForm({
  formData,
  editingKey,
  isSubmitting,
  onFieldChange,
  onSubmit,
  onCancel,
}: ApiKeyFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {/* Key Name */}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Key Name{" "}
          <span className="font-normal text-gray-500">
            — A unique name to identify this key
          </span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Key Name"
        />
      </div>

      {/* Key Type */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-gray-900">
          Key Type{" "}
          <span className="font-normal text-gray-500">
            {editingKey
              ? "— Environment for this key"
              : "— Choose the environment for this key"}
          </span>
        </label>
        <div className="space-y-3">
          {/* Development Option */}
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-colors ${
              formData.type === "dev"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="keyType"
              value="dev"
              checked={formData.type === "dev"}
              onChange={(e) =>
                onFieldChange("type", e.target.value as "dev" | "prod")
              }
              className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span className="font-medium text-gray-900">Development</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Rate limited to 100 requests/minute
              </p>
            </div>
          </label>

          {/* Production Option */}
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-colors ${
              formData.type === "prod"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="keyType"
              value="prod"
              checked={formData.type === "prod"}
              onChange={(e) =>
                onFieldChange("type", e.target.value as "dev" | "prod")
              }
              className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="font-medium text-gray-900">Production</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Rate limited to 1,000 requests/minute
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Limit Monthly Usage */}
      <div className="mb-6">
        <label className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.limitMonthlyUsage}
            onChange={(e) =>
              onFieldChange("limitMonthlyUsage", e.target.checked)
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-900">
            Limit monthly usage
            {!editingKey && <span className="text-red-500">*</span>}
          </span>
        </label>
        {formData.limitMonthlyUsage && (
          <input
            type="number"
            min="1"
            value={formData.monthlyUsageLimit}
            onChange={(e) =>
              onFieldChange(
                "monthlyUsageLimit",
                parseInt(e.target.value) || 1000
              )
            }
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        )}
        {!editingKey && (
          <p className="mt-2 text-xs text-gray-500">
            * If the combined usage of all your keys exceeds your account's
            allocated usage limit (plan, add-ons, and any pay-as-you-go limit),
            all requests will be rejected.
          </p>
        )}
      </div>

      {/* PII Restrictions (Edit only) */}
      {editingKey && (
        <div className="mb-6">
          <label className="mb-2 flex items-start gap-2">
            <input
              type="checkbox"
              checked={formData.piiRestrictions}
              onChange={(e) =>
                onFieldChange("piiRestrictions", e.target.checked)
              }
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Enable PII Restrictions{" "}
              <span className="font-normal text-gray-500">
                — Configure how to handle Personal Identifiable Information
                (PII) in user queries
              </span>
            </span>
          </label>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {editingKey ? "Save Changes" : "Create"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
