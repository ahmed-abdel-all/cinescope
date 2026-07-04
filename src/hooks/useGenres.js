import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services/movieService";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => movieService.getGenres(),
    staleTime: Infinity,
  });
}