export type ToastVariant = "success" | "warning" | "error";

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  variant?: ToastVariant;
}
