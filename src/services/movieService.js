import apiClient from "./apiClient";

export const movieService = {
  getMovies({ page = 1, sortBy = "popularity.desc", genre = "" } = {}) {
    return apiClient
      .get("/discover/movie", {
        params: {
          page,
          sort_by: sortBy,
          with_genres: genre || undefined,
        },
      })
      .then((response) => response.data);
  },

  getMovieDetails(id) {
    return apiClient
      .get(`/movie/${id}`, {
        params: {
          append_to_response: "videos,recommendations",
        },
      })
      .then((response) => response.data);
  },

  searchMovies({ query, page = 1 } = {}) {
    return apiClient
      .get("/search/movie", {
        params: {
          query,
          page,
        },
      })
      .then((response) => response.data);
  },

  getGenres() {
    return apiClient
      .get("/genre/movie/list")
      .then((response) => response.data);
  },
};

export default movieService;
