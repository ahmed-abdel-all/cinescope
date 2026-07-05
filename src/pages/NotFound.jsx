import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-zinc-950 px-4 py-16 text-zinc-100">
      <div className="w-full max-w-[28rem] rounded-2xl border border-white/10 bg-black/40 p-8 text-center shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          The scene you are looking for is not available. Head back home and
          keep browsing CineScope.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
