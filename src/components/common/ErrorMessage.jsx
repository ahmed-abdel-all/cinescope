function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again in a moment.",
}) {
  return (
    <div className="px-4 py-6">
      <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-5 text-zinc-100">
        <h2 className="text-base font-semibold text-red-200">{title}</h2>
        <p className="mt-2 text-sm text-red-100/80">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
