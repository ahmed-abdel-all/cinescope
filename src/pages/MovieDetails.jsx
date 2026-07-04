import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useMovieDetails } from "../hooks/useMovieDetails";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isLoading, isError, error } = useMovieDetails(id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-on-surface-variant font-body-base">Loading...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-error font-body-base">
          {error?.message || "Movie not found."}
        </p>
      </div>
    );
  }

  const title = movie.title;
  const overview = movie.overview;
  const posterPath = movie.poster_path;
  const backdropPath = movie.backdrop_path;
  const voteAverage = movie.vote_average;
  const releaseDate = movie.release_date;
  const runtime = movie.runtime;
  const genres = movie.genres;
  const budget = movie.budget;
  const revenue = movie.revenue;
  const videos = movie.videos;
  const recommendations = movie.recommendations;
  const credits = movie.credits;

  const trailer = videos && videos.results
    ? videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube")
    : null;

  const director = credits && credits.crew
    ? credits.crew.find((c) => c.job === "Director")
    : null;

  const writer = credits && credits.crew
    ? credits.crew.find((c) => c.job === "Screenplay" || c.job === "Writer")
    : null;

  const recommendedMovies = recommendations && recommendations.results
    ? recommendations.results.slice(0, 6)
    : [];

  const formatCurrency = (num) => {
    if (!num) return "N/A";
    return "$" + (num / 1000000).toFixed(0) + "M";
  };

  const formatRuntime = (mins) => {
    if (!mins) return "N/A";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h + "h " + m + "m";
  };

  return (
    <div className="pb-24">
      <section className="relative w-full h-[400px] md:h-[530px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: backdropPath
              ? "url(" + BACKDROP_BASE_URL + backdropPath + ")"
              : "none",
          }}
        ></div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(31,15,16,0) 0%, rgba(31,15,16,0.8) 70%, rgba(31,15,16,1) 100%)",
          }}
        ></div>

        {trailer ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={"https://www.youtube.com/watch?v=" + trailer.key}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-20 h-20 bg-primary-container/90 text-white rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
              style={{ boxShadow: "0 0 25px rgba(225,29,72,0.4)" }}
            >
              <span className="text-3xl ml-1">Play</span>
            </a>
          </div>
        ) : null}
      </section>

      <section className="relative -mt-24 px-4 md:px-lg max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-48 md:w-64 shrink-0 mx-auto md:mx-0 -mt-8 md:-mt-16">
            <div className="aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
              <img
                src={posterPath ? POSTER_BASE_URL + posterPath : "/no-image.png"}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-secondary-container text-on-secondary px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                <span className="font-label-caps text-label-caps">
                  {voteAverage ? voteAverage.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 pt-4 md:pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display-lg-mobile md:text-display-lg text-on-surface mb-2 tracking-tight">
                  {title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-surface-variant/80 font-label-caps text-label-caps">
                  <span>{releaseDate ? releaseDate.split("-")[0] : "N/A"}</span>
                  <span>{formatRuntime(runtime)}</span>
                  <span>{genres ? genres.map((g) => g.name).join(", ") : ""}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center gap-2 px-6 py-3 bg-surface-container-high rounded-full border border-white/5 hover:bg-surface-variant/30 transition-all active:scale-95"
                >
                  <span className="font-label-caps text-label-caps">
                    {isFavorite ? "In Favorites" : "Add to Favorites"}
                  </span>
                </button>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 md:p-8 border border-white/5"
              style={{
                background: "rgba(44,27,28,0.6)",
                backdropFilter: "blur(24px)",
              }}
            >
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                About the movie
              </h3>
              <p className="font-body-base text-on-surface-variant leading-relaxed opacity-90">
                {overview}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/5">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/50 mb-1">
                    DIRECTOR
                  </p>
                  <p className="font-body-base font-semibold">
                    {director ? director.name : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/50 mb-1">
                    WRITER
                  </p>
                  <p className="font-body-base font-semibold">
                    {writer ? writer.name : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/50 mb-1">
                    BUDGET
                  </p>
                  <p className="font-body-base font-semibold">
                    {formatCurrency(budget)}
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant/50 mb-1">
                    REVENUE
                  </p>
                  <p className="font-body-base font-semibold">
                    {formatCurrency(revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {recommendedMovies.length > 0 ? (
        <section className="mt-16 px-4 md:px-lg max-w-container-max mx-auto">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-8">
            Recommended Movies
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
            {recommendedMovies.map((rec) => (
              <Link
                key={rec.id}
                to={"/movie/" + rec.id}
                className="flex-none w-40 md:w-56 group cursor-pointer"
              >
                <div className="aspect-2/3 rounded-xl overflow-hidden relative mb-3 border border-white/5 transition-transform duration-500 group-hover:-translate-y-2">
                  <img
                    src={rec.poster_path ? POSTER_BASE_URL + rec.poster_path : "/no-image.png"}
                    alt={rec.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-title-lg text-on-surface truncate group-hover:text-primary transition-colors">
                  {rec.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default MovieDetails;