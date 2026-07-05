import { Link } from "react-router-dom";

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

function MovieCard({ movie }) {
  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    genre_names,
  } = movie;

  const releaseYear = release_date ? release_date.split("-")[0] : "N/A";
  const rating = Number.isFinite(vote_average) ? vote_average.toFixed(1) : "N/A";
  const posterUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : "/no-image.png";

  return (
    <Link to={`/movie/${id}`} className="group block">
      <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:border-red-400/40">
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = "/no-image.png";
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-lg border border-amber-300/30 bg-amber-400 px-2 py-1 text-xs font-bold text-zinc-950">
          {rating}
        </div>

        <div className="absolute inset-0 flex translate-y-3 flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {genre_names ? (
            <span className="mb-1 text-xs font-semibold uppercase tracking-widest text-red-300">
              {genre_names}
            </span>
          ) : null}

          <h3 className="truncate text-base font-semibold leading-tight text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-300">{releaseYear}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
