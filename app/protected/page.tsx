"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { apiKeyValidationService } from "@/services/api-key-validation-service";
import Sidebar from "@/components/Sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import Toast from "@/components/Toast";
import { useToast } from "@/hooks/use-toast";

/**
 * Protected page component
 * Single Responsibility: Validates API key and shows result
 */
export default function ProtectedPage() {
  const router = useRouter();
  const { isOpen, close } = useSidebar();
  const { toast, showToast, hideToast } = useToast();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateApiKey = async () => {
      try {
        // Get API key from sessionStorage
        const apiKey = sessionStorage.getItem("apiKeyToValidate");

        if (!apiKey) {
          // No API key found, redirect to playground
          router.push("/playground");
          return;
        }

        // Validate the API key
        const isValid = await apiKeyValidationService.validateApiKey(apiKey);

        if (isValid) {
          // Valid API key - show success toast
          showToast("Valid API Key, /protected can be accessed", "success");
          // Store validation result
          sessionStorage.setItem("apiKeyValidated", "true");
        } else {
          // Invalid API key - show error toast
          showToast("Invalid API Key", "error");
          // Clear invalid key
          sessionStorage.removeItem("apiKeyToValidate");
        }
      } catch (error) {
        console.error("Error validating API key:", error);
        showToast("Invalid API Key", "error");
        sessionStorage.removeItem("apiKeyToValidate");
      } finally {
        setIsValidating(false);
      }
    };

    validateApiKey();
  }, [router, showToast]);

  return (
    <div className="flex min-h-screen">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        variant={toast.variant}
      />

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div className="mb-8 flex items-center gap-4">
            <SidebarToggle />
            <div>
              <p className="text-sm text-white/70">Pages / Protected</p>
              <h1 className="text-3xl font-bold text-white">Protected Page</h1>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {isValidating ? (
              <div className="text-center">
                <p className="text-gray-600">Validating API key...</p>
              </div>
            ) : (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Protected Content
                </h2>
                <p className="text-sm text-gray-600">
                  {sessionStorage.getItem("apiKeyValidated") === "true"
                    ? "You have successfully validated your API key. This page is now accessible."
                    : "API key validation failed. Please try again."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
