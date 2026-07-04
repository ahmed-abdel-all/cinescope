import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/movie/MovieGrid";
import MoviePagination from "../components/movie/MoviePagination";
import MovieFilters from "../components/movie/MovieFilters";
import MovieSort from "../components/movie/MovieSort";
import { useMovies } from "../hooks/useMovies";

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  const { data, isLoading, isError, error } = useMovies({
    page,
    sortBy,
    genre,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre);
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setPage(1);
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  return (
    <div className="max-w-container-max mx-auto px-gutter py-md">
      <h1 className="font-headline-md text-headline-md text-on-background mb-md text-center md:text-left">
        Movies
      </h1>

      <div className="flex flex-col items-center gap-4 mb-lg">
        <MovieFilters
          selectedGenre={genre}
          onGenreChange={handleGenreChange}
        />

        <MovieSort
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      {isLoading && (
        <p className="text-center mt-10 text-on-surface-variant font-body-base">
          Loading movies...
        </p>
      )}

      {isError && (
        <p className="text-center text-error mt-10 font-body-base">
          Error: {error.message}
        </p>
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <p className="text-center mt-10 text-on-surface-variant font-body-base">
          No movies found.
        </p>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />

          <MoviePagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default Movies;