function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center justify-center px-4 py-10 text-zinc-100">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-5 py-4 shadow-lg">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
        <span className="text-sm font-medium text-zinc-200">{label}</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
