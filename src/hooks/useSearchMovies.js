import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { movieService } from "../services/movieService";

export function useSearchMovies({ query, page = 1 } = {}) {
  return useQuery({
    queryKey: ["searchMovies", query, page],
    queryFn: () => movieService.searchMovies({ query, page }),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
}
