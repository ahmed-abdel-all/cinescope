import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services/movieService";

export function useMovies({ page = 1, sortBy = "popularity.desc", genre = "" } = {}) {
  return useQuery({
    queryKey: ["movies", page, sortBy, genre],
    queryFn: () => movieService.getMovies({ page, sortBy, genre }),
    keepPreviousData: true,
  });
}