import { ApiKey } from "@/types/api-key";
import { maskApiKey } from "@/utils/api-key-masker";
import { copyToClipboard } from "@/utils/clipboard";

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  loading: boolean;
  revealedKeys: Set<string>;
  onToggleReveal: (id: string) => void;
  onCopy: (key: string) => void;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
}

/**
 * API Keys table component
 * Single Responsibility: Renders the API keys table
 */
export function ApiKeyTable({
  apiKeys,
  loading,
  revealedKeys,
  onToggleReveal,
  onCopy,
  onEdit,
  onDelete,
}: ApiKeyTableProps) {
  const displayApiKey = (key: ApiKey) => {
    return revealedKeys.has(key.id) ? key.key : maskApiKey(key.key);
  };

  const handleCopy = async (key: string) => {
    try {
      await copyToClipboard(key);
      onCopy(key);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                NAME
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                TYPE
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                USAGE
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                KEY
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                OPTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-sm text-gray-500"
                >
                  Loading API keys...
                </td>
              </tr>
            ) : apiKeys.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-sm text-gray-500"
                >
                  No API keys found. Create your first API key to get started.
                </td>
              </tr>
            ) : (
              apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                    {key.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                    <span className="inline-flex rounded px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                      {key.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                    {key.usage}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <code className="font-mono text-xs">
                      {displayApiKey(key)}
                    </code>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleReveal(key.id)}
                        className="p-1.5 text-gray-400 transition-colors hover:text-gray-600"
                        title={
                          revealedKeys.has(key.id) ? "Hide key" : "Reveal key"
                        }
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {revealedKeys.has(key.id) ? (
                            <>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                              />
                              <circle cx="12" cy="12" r="3" strokeWidth={2} />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3l18 18"
                              />
                            </>
                          ) : (
                            <>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                              />
                              <circle cx="12" cy="12" r="3" strokeWidth={2} />
                            </>
                          )}
                        </svg>
                      </button>
                      <button
                        onClick={() => handleCopy(key.key)}
                        className="p-1.5 text-gray-400 transition-colors hover:text-gray-600"
                        title="Copy to clipboard"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onEdit(key)}
                        className="p-1.5 text-gray-400 transition-colors hover:text-gray-600"
                        title="Edit"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(key.id)}
                        className="p-1.5 text-gray-400 transition-colors hover:text-red-600"
                        title="Delete"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
