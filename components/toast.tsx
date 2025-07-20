"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface ToastProps {
  toast: any;
  onDismiss: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const toastStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = (toastIcons as any)[toast.type || "info"];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={`
      flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md w-full bg-[--surface-card]
      ${(toastStyles as any)[toast.type || "info"]}
      animate-in slide-in-from-right-full duration-300
    `}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold text-sm">{toast.title}</div>
        )}
        {toast.description && (
          <div className="text-sm opacity-90 mt-1">{toast.description}</div>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ToasterProps {
  toasts: any[];
  onDismiss: (id: string) => void;
}

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 ">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
