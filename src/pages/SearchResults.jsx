import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/movie/MovieGrid";
import MoviePagination from "../components/movie/MoviePagination";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SkeletonCard from "../components/common/SkeletonCard";
import { useMovies } from "../hooks/useMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const didMount = useRef(false);

  const debouncedQuery = useDebounce(searchInput, 500);
  const hasQuery = debouncedQuery.trim().length > 0;

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    const params = {};

    if (hasQuery) {
      params.query = debouncedQuery.trim();
    }

    if (page > 1) {
      params.page = page.toString();
    }

    setSearchParams(params);
  }, [debouncedQuery, hasQuery, page, setSearchParams]);

  const popularResult = useMovies({ page });
  const searchResult = useSearchMovies({
    query: debouncedQuery,
    page,
  });

  const { data, isLoading, isError, error } =
    hasQuery ? searchResult : popularResult;

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const totalResults = data?.total_results || 0;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  return (
    <div className="max-w-container-max mx-auto px-gutter py-md">
      <p className="font-label-caps text-label-caps text-primary mb-2 tracking-widest">
        SEARCH HERE
      </p>

      <div className="relative mb-md">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search movies..."
          autoFocus
          className="w-full h-14 px-6 pr-14 bg-surface-container/30 border border-outline-variant/20 rounded-xl font-body-base text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none backdrop-blur-xl transition-all duration-300"
        />

        {searchInput && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary text-xl"
          >
            ✕
          </button>
        )}
      </div>

      <h1 className="font-headline-md text-headline-md text-on-background mb-2">
        {hasQuery
          ? `Results for "${debouncedQuery}"`
          : "Popular Movies"}
      </h1>

      {!isLoading && (
        <p className="text-on-surface-variant/60 font-body-sm mb-lg">
          {hasQuery
            ? `${totalResults} results found`
            : `${totalResults} movies`}
        </p>
      )}

      {isLoading && (
        <>
          <LoadingSpinner label={hasQuery ? "Searching movies" : "Loading movies"} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </>
      )}

      {isError && (
        <ErrorMessage
          title="Could not load search results"
          message={error?.message || "Please try again in a moment."}
        />
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <EmptyState
          title="No movies found"
          message={hasQuery ? "Try another keyword." : "There are no movies to show yet."}
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

export default SearchResults;
