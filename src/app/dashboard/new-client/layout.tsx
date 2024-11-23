// src/app/(dashboard)/new-client/layout.tsx
export default function NewClientLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-2 sm:p-4 md:p-8">{children}</div>;
  }