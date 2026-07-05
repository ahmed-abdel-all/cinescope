import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services/movieService";

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => movieService.getMovieDetails(id),
    enabled: !!id,
  });
}
