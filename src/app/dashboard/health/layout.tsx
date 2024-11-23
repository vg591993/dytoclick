// src/app/dashboard/health/layout.tsx
export default function HealthDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8e6d3] via-[#e9f0e6] to-[#d4ebe4] relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#f8e6d3]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#d4ebe4]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#e9f0e6]/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}