import { Link } from "react-router-dom";
import useFavoritesStore from "../store/useFavoritesStore";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Favorites() {
  const { favorites, removeFavorite } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">My Favorites</h1>

        <p className="text-gray-400 text-lg">
          You haven't added any favorite movies yet.
        </p>

        <Link
          to="/movies"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-2">
        My Favorites
      </h1>

      <p className="text-gray-400 mb-10">
        {favorites.length} Favorite Movies
      </p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="rounded-xl overflow-hidden bg-zinc-900 shadow-lg"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? IMAGE_BASE_URL + movie.poster_path
                    : "/no-image.png"
                }
                alt={movie.title}
                className="w-full aspect-2/3 object-cover"
              />
            </Link>

            <div className="p-4">
              <h3 className="font-semibold line-clamp-1">
                {movie.title}
              </h3>

              <p className="text-yellow-400 mt-2">
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>

              <p className="text-gray-400 text-sm">
                {movie.release_date?.split("-")[0]}
              </p>

              <button
                onClick={() => removeFavorite(movie.id)}
                className="w-full mt-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;