import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/movie/MovieGrid";
import MoviePagination from "../components/movie/MoviePagination";
import MovieFilters from "../components/movie/MovieFilters";
import MovieSort from "../components/movie/MovieSort";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SkeletonCard from "../components/common/SkeletonCard";
import { useMovies } from "../hooks/useMovies";

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialGenre = searchParams.get("genre") || "";
  const initialSortBy = searchParams.get("sortBy") || "popularity.desc";

  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [genre, setGenre] = useState(initialGenre);

  useEffect(() => {
    const params = { page: page.toString() };

    if (genre) {
      params.genre = genre;
    }

    if (sortBy !== "popularity.desc") {
      params.sortBy = sortBy;
    }

    setSearchParams(params);
  }, [genre, page, setSearchParams, sortBy]);

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
        <>
          <LoadingSpinner label="Loading movies" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </>
      )}

      {isError && (
        <ErrorMessage
          title="Could not load movies"
          message={error?.message || "Please try again in a moment."}
        />
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <EmptyState
          title="No movies found"
          message="Try changing the selected genre or sort order."
        />
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
