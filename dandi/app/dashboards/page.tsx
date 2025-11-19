"use client";

import { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { useApiKeys } from "@/hooks/use-api-keys";
import { useApiKeyForm } from "@/hooks/use-api-key-form";
import { useRevealedKeys } from "@/hooks/use-revealed-keys";
import { useToast } from "@/hooks/use-toast";
import { apiKeyService } from "@/services/api-key-service";
import Toast from "@/components/Toast";
import Sidebar from "@/components/Sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import { Modal } from "@/components/ui/Modal";
import { ApiKeyForm } from "@/components/api-keys/ApiKeyForm";
import { ApiKeyTable } from "@/components/api-keys/ApiKeyTable";
import { ApiKey } from "@/types/api-key";

/**
 * Dashboards page component
 * Single Responsibility: Orchestrates the dashboard UI
 * Uses composition with smaller components and custom hooks
 */
export default function DashboardsPage() {
  const { isOpen, close } = useSidebar();
  const { apiKeys, loading, error, refetch } = useApiKeys();
  const { revealedKeys, toggleReveal } = useRevealedKeys();
  const { toast, showToast, hideToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);

  const {
    formData,
    editingKey,
    isSubmitting,
    error: formError,
    updateFormField,
    initializeForm,
    resetForm,
    submitForm,
  } = useApiKeyForm({
    onSuccess: () => {
      setIsModalOpen(false);
      refetch();
    },
    onError: (error) => {
      console.error("Form error:", error);
    },
  });

  const handleOpenModal = (key?: ApiKey) => {
    if (key) {
      initializeForm(key);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) {
      return;
    }

    try {
      await apiKeyService.delete(id);
      await refetch();
      setDeleteToast(true);
      setTimeout(() => setDeleteToast(false), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete API key";
      showToast(errorMessage, "error");
      console.error("Error deleting API key:", err);
    }
  };

  const handleCopy = () => {
    showToast("Copied API Key to clipboard", "success");
  };

  return (
    <div className="flex min-h-screen">
      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        variant={toast.variant}
      />
      <Toast
        message="API Key deleted successfully"
        isVisible={deleteToast}
        onClose={() => setDeleteToast(false)}
        variant="warning"
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
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarToggle />
              <div>
                <p className="text-sm text-white/70">Pages / Overview</p>
                <h1 className="text-3xl font-bold text-white">Overview</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Operational
              </button>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="text-white/70 hover:text-white"
                  title="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white"
                  title="Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white"
                  title="Email"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <button
                  className="text-white/70 hover:text-white"
                  title="Toggle dark mode"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-600">
                  CURRENT PLAN
                </p>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Researcher</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">API Usage</span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Monthly plan</p>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Pay as you go</span>
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </label>
                  </div>
                  <p className="text-sm font-medium text-gray-900">0/1,000 Credits</p>
                </div>
              </div>
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Manage Plan
              </button>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
              <button
                onClick={() => handleOpenModal()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              The key is used to authenticate your requests to the Research API.
              To learn more, see the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                documentation page
              </a>
              .
            </p>

            {/* Error Message */}
            {(error || formError) && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error || formError}
              </div>
            )}

            {/* API Keys Table */}
            <ApiKeyTable
              apiKeys={apiKeys}
              loading={loading}
              revealedKeys={revealedKeys}
              onToggleReveal={toggleReveal}
              onCopy={handleCopy}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </div>

          {/* Remote MCP Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Remote MCP
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              Connect directly to Tavily's remote MCP server for a seamless
              experience without local installation or configuration. Select your
              desired API key and click the button below to generate the MCP
              connection URL. For examples on how to use the remote MCP,{" "}
              <a href="#" className="text-blue-600 hover:underline">
                click here
              </a>
              .
            </p>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  API Key
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  {apiKeys.map((key) => (
                    <option key={key.id} value={key.id}>
                      {key.name} ({key.type})
                    </option>
                  ))}
                </select>
              </div>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Generate MCP Link
              </button>
            </div>
          </div>

          {/* Tavily Expert Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Tavily Expert
                </h2>
                <p className="text-sm text-gray-600">
                  Your expert is a specialized agent, always up to date with
                  Tavily's latest documentation and best practices. To be used in
                  AI-native IDEs to accurately implement and test Tavily tools
                  within your application.
                </p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-xs text-gray-500">Powered by</p>
                <p className="text-sm font-medium text-gray-700">Tadata</p>
              </div>
            </div>
            <button className="mb-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Get your Tavily Expert
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 text-center">
            <p className="mb-4 text-sm text-gray-600">
              Have any questions, feedback or need support? We'd love to hear from
              you!
            </p>
            <button className="rounded-lg border-2 border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
              Contact us
            </button>
          </div>
        </div>
      </main>

      {/* Modal for Create/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingKey ? "Edit API key" : "Create a new API key"}
        description={
          editingKey
            ? "Enter a new limit for the API key and configure PII restrictions."
            : "Enter a name and limit for the new API key."
        }
      >
        <ApiKeyForm
          formData={formData}
          editingKey={!!editingKey}
          isSubmitting={isSubmitting}
          onFieldChange={updateFormField}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
