"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Try again
      </button>
    </div>
  );
}
