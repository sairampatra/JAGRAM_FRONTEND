export function ErrorBoundryFallback({ error, resetErrorBoundry }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p className="mb-2 italic text-sm">Error: {error.message}</p>

      <button onClick={resetErrorBoundry}>Try Again</button>
    </div>
  );
}
