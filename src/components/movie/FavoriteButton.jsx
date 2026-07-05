import useFavoritesStore from "../../store/useFavoritesStore";

function FavoriteButton({ movie }) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (!movie?.id) {
    return null;
  }

  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);
  const label = isFavorite ? "In Watchlist" : "Add to Favorites";

  const handleToggle = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
      return;
    }

    addFavorite(movie);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isFavorite}
      aria-label={label}
      className={`rounded-full border px-5 py-3 text-sm font-semibold shadow-lg transition active:scale-95 ${
        isFavorite
          ? "border-red-400/70 bg-red-500 text-white shadow-red-950/40 hover:bg-red-400"
          : "border-white/10 bg-zinc-900/90 text-zinc-100 shadow-black/30 hover:border-red-400/60 hover:bg-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}

export default FavoriteButton;
