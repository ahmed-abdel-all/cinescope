function EmptyState({
  title = "No results found",
  message = "There is nothing to show here yet.",
}) {
  return (
    <div className="px-4 py-10">
      <div className="mx-auto w-full max-w-[28rem] rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 text-center text-[var(--app-text)] shadow-xl">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-[var(--app-muted)]">{message}</p>
      </div>
    </div>
  );
}

export default EmptyState;
