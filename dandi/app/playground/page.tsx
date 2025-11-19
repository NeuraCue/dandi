"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import Sidebar from "@/components/Sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import { Button } from "@/components/ui/Button";

/**
 * Playground page component
 * Single Responsibility: Renders the API key submission form
 */
export default function PlaygroundPage() {
  const router = useRouter();
  const { isOpen, close } = useSidebar();
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Store API key in sessionStorage temporarily for validation
    sessionStorage.setItem("apiKeyToValidate", apiKey.trim());
    
    // Navigate to protected page
    router.push("/protected");
  };

  return (
    <div className="flex min-h-screen">
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
              <p className="text-sm text-white/70">Pages / API Playground</p>
              <h1 className="text-3xl font-bold text-white">API Playground</h1>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Submit API Key
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Enter your API key to validate and access protected content.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="apiKey"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  API Key
                </label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Validating..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

