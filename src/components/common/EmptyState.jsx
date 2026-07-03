function EmptyState({
  title = "No results found",
  message = "There is nothing to show here yet.",
}) {
  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-zinc-950 p-6 text-center text-zinc-100">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  );
}

export default EmptyState;
