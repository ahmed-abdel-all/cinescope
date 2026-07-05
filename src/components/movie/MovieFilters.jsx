import { useGenres } from "../../hooks/useGenres";

function MovieFilters({ selectedGenre, onGenreChange }) {
  const { data, isLoading } = useGenres();
  const genres = data?.genres || [];

  if (isLoading) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onGenreChange("")}
        className={`px-5 py-2 rounded-full font-label-caps text-label-caps whitespace-nowrap active:scale-95 transition-all ${
          selectedGenre === ""
            ? "bg-primary text-on-primary"
            : "border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant/20"
        }`}
      >
        All Genres
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(String(genre.id))}
          className={`px-5 py-2 rounded-full font-label-caps text-label-caps whitespace-nowrap active:scale-95 transition-all ${
            selectedGenre === String(genre.id)
              ? "bg-primary text-on-primary"
              : "border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant/20"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default MovieFilters;