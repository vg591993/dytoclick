// src/app/dashboard/health/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
      >
        Try again
      </button>
    </div>
  );
}