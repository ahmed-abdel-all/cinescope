import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import MovieCard from "../components/movie/MovieCard";
import useFavoritesStore from "../store/useFavoritesStore";

function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (favorites.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="No favorites yet"
          message="Add movies to your watchlist and they will appear here."
        />
        <div className="mt-6 text-center">
          <Link
            to="/movies"
            className="inline-flex rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            Browse Movies
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-red-300">
            Watchlist
          </p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-100">
            My Favorites
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {favorites.length} saved {favorites.length === 1 ? "movie" : "movies"}
          </p>
        </div>

        <button
          type="button"
          onClick={clearFavorites}
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-red-400/60 hover:bg-zinc-900"
        >
          Clear Watchlist
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {favorites.map((movie) => (
          <div key={movie.id} className="space-y-3">
            <MovieCard movie={movie} />
            <button
              type="button"
              onClick={() => removeFavorite(movie.id)}
              className="w-full rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500 hover:text-white"
            >
              Remove from Watchlist
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;
