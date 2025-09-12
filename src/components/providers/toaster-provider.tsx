"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme="dark"
      toastOptions={{
        style: {
          background: '#1f2937',
          border: '1px solid #374151',
          color: '#f3f4f6',
        },
        className: 'voice-toast',
        duration: 4000,
      }}
    />
  );
}