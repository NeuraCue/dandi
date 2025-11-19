import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Reusable Modal component
 * Single Responsibility: Renders a modal dialog
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="mb-6 text-sm text-gray-600">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
