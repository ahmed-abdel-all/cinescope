import useFavoritesStore from "../store/useFavoritesStore";

function Favorites() {
  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        favorites.map((movie) => (
          <div key={movie.id}>
            {movie.title}
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;