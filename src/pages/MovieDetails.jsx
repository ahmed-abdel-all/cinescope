import { useParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SkeletonCard from "../components/common/SkeletonCard";
import FavoriteButton from "../components/movie/FavoriteButton";
import RecommendedMovies from "../components/movie/RecommendedMovies";
import TrailerEmbed from "../components/movie/TrailerEmbed";
import { useMovieDetails } from "../hooks/useMovieDetails";

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isLoading, isError, error } = useMovieDetails(id);

  if (isLoading) {
    return (
      <main className="min-h-[70vh] bg-zinc-950 px-4 py-20 sm:px-6 lg:px-8">
        <LoadingSpinner label="Loading movie details" />
        <div className="mx-auto mt-8 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-[70vh] bg-zinc-950 py-10">
        <ErrorMessage
          title="Could not load movie"
          message={error?.message || "Please try again in a moment."}
        />
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-[70vh] bg-zinc-950 py-10">
        <EmptyState
          title="Movie not found"
          message="We could not find details for this movie."
        />
      </main>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : "";
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "";
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const genres = Array.isArray(movie.genres)
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";
  const metadata = [releaseYear, runtime, genres].filter(Boolean);

  return (
    <main className="min-h-screen bg-zinc-950 pb-16 text-zinc-100">
      <section className="relative min-h-[560px] overflow-hidden">
        <div className="absolute inset-0 h-[420px] sm:h-[520px] lg:h-[600px]">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt=""
              className="h-full w-full object-cover opacity-50"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-red-950/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/70 to-zinc-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-10 pt-40 sm:px-6 lg:flex-row lg:px-8 lg:pt-64">
          <div className="mx-auto w-48 shrink-0 sm:w-64 lg:mx-0">
            <div className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="aspect-2/3 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-2/3 items-center justify-center p-6 text-center text-sm text-zinc-500">
                  Poster unavailable
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 self-end">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-300">
                  {metadata.map((item, index) => (
                    <span key={item} className="flex items-center gap-3">
                      {index > 0 ? (
                        <span className="h-1 w-1 rounded-full bg-red-400/70" />
                      ) : null}
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="max-w-4xl text-4xl font-extrabold tracking-normal text-white sm:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-amber-300/30 bg-amber-400 px-4 py-2 text-sm font-bold text-zinc-950 shadow-lg">
                  {rating}
                </div>
                <FavoriteButton movie={movie} />
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur md:p-8">
              <h2 className="text-2xl font-bold text-red-200">
                About the movie
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
                {movie.overview || "No overview is available for this movie."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrailerEmbed videos={movie.videos?.results} />
      <RecommendedMovies movies={movie.recommendations?.results} />
    </main>
  );
}

export default MovieDetails;
