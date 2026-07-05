import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-center text-on-surface-variant/60 mt-10 font-body-base">
        No movies to display
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;