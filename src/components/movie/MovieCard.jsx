import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

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
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";

  return (
    <Link to={`/movie/${id}`} className="group relative cursor-pointer block">
      <div className="aspect-2/3 rounded-xl overflow-hidden border border-outline-variant/10 shadow-lg relative bg-surface-container-low">
        <img
          src={poster_path ? `${IMAGE_BASE_URL}${poster_path}` : "/no-image.png"}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/no-image.png";
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-surface-container-highest/80 backdrop-blur-md px-2 py-1 rounded-lg border border-outline-variant/20">
          <span className="text-secondary text-[16px]">⭐</span>
          <span className="font-label-caps text-[12px] font-bold text-on-surface">
            {rating}
          </span>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-end p-4">
          {genre_names && (
            <span className="font-label-caps text-[10px] text-primary mb-1 uppercase tracking-widest">
              {genre_names}
            </span>
          )}

          <h3 className="font-title-lg text-title-lg text-white leading-tight truncate">
            {title}
          </h3>

          <p className="text-body-sm text-on-surface-variant">
            {releaseYear}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;