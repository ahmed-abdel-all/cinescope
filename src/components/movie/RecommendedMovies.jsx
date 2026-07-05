import MovieCard from "./MovieCard";

function RecommendedMovies({ movies }) {
  const recommendedMovies = Array.isArray(movies) ? movies.slice(0, 12) : [];

  if (recommendedMovies.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-8 w-1 rounded-full bg-red-500" />
        <h2 className="text-2xl font-bold text-zinc-100">
          Recommended Movies
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {recommendedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default RecommendedMovies;
