import { Link } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Home() {
  const { data, isLoading, isError } = useMovies({ page: 1 });

  const movies = data?.results || [];
  const featured = movies[0];
  const trending = movies.slice(1, 9);
  const trendingLoop = [...trending, ...trending];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-on-surface-variant font-body-base">Loading...</p>
      </div>
    );
  }

  if (isError || !featured) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-error font-body-base">Failed to load movies.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="relative w-full h-[560px] md:h-[751px] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}${featured.backdrop_path})`,
            }}
          />
        </div>

        <div className="relative z-20 w-full px-gutter md:px-lg mb-10 md:mb-16 max-w-container-max mx-auto">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-secondary-container text-on-secondary px-3 py-1 rounded-full font-label-caps text-xs font-bold tracking-widest">
                FEATURED
              </span>
              <div className="flex items-center gap-1 text-secondary">
                <span className="text-lg">★</span>
                <span className="font-bold">
                  {featured.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="text-on-surface-variant/60 font-medium">
                {featured.release_date?.split("-")[0]}
              </span>
            </div>

            <h2 className="font-display-lg-mobile md:text-display-lg md:font-display-lg text-on-surface tracking-tight leading-none">
              {featured.title}
            </h2>

            <p className="text-on-surface-variant text-base md:text-xl line-clamp-3 leading-relaxed opacity-90">
              {featured.overview}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to={`/movie/${featured.id}`}
                className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all duration-300 active:scale-95"
                style={{ boxShadow: "0 0 15px rgba(225, 29, 72, 0.4)" }}
              >
                <span>▶</span>
                View Details
              </Link>
              <button className="bg-surface-variant/20 backdrop-blur-md border border-white/10 text-on-surface px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-surface-variant/40 transition-all duration-300">
                <span>+</span>
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="mt-8 px-gutter max-w-container-max mx-auto overflow-hidden">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Trending Now
            </h3>
            <p className="text-on-surface-variant/60 font-body-sm">
              The most watched movies this week
            </p>
          </div>
          <Link
            to="/movies"
            className="text-primary font-label-caps text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            VIEW ALL →
          </Link>
        </div>

        <div className="relative overflow-hidden group/marquee -mx-gutter px-gutter">
          <div className="flex gap-6 w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {trendingLoop.map((movie, index) => (
              <Link
                key={`${movie.id}-${index}`}
                to={`/movie/${movie.id}`}
                className="flex-none w-[160px] md:w-[220px] group cursor-pointer"
              >
                <div className="aspect-2/3 rounded-xl overflow-hidden relative bg-surface-container/40 border border-white/10 mb-3 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <img
                    src={
                      movie.poster_path
                        ? `${POSTER_BASE_URL}${movie.poster_path}`
                        : "/no-image.png"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-[12px] font-bold text-secondary">
                    ★ {movie.vote_average?.toFixed(1)}
                  </div>
                </div>
                <h4 className="font-title-lg text-on-surface truncate group-hover:text-primary transition-colors">
                  {movie.title}
                </h4>
                <p className="text-on-surface-variant/60 text-sm font-label-caps">
                  {movie.release_date?.split("-")[0]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;