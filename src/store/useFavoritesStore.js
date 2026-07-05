import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],

      addFavorite: (movie) =>
        set((state) => ({
          favorites: state.favorites.some((favorite) => favorite.id === movie.id)
            ? state.favorites
            : [...state.favorites, movie],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (movie) => movie.id !== id
          ),
        })),

      clearFavorites: () =>
        set({
          favorites: [],
        }),
    }),
    {
      name: "favorites-storage",
    }
  )
);

export default useFavoritesStore;
