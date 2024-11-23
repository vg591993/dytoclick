// src/lib/utils.ts
export function cn(...inputs: (string | undefined)[]) {
    return inputs.filter(Boolean).join(" ");
  }
  
  export interface DialogProps extends DialogPrimitive.DialogProps {
    children: React.ReactNode;
  }