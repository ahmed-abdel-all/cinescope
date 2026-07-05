function TrailerEmbed({ videos }) {
  const videoList = Array.isArray(videos) ? videos : [];
  const youtubeVideos = videoList.filter(
    (video) => video?.site === "YouTube" && video?.key
  );

  const selectedVideo =
    youtubeVideos.find((video) => video.type === "Trailer") ||
    youtubeVideos[0];

  if (!selectedVideo) {
    return null;
  }

  return (
    <section className="mx-auto mt-14 max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-8 w-1 rounded-full bg-red-500" />
        <h2 className="text-2xl font-bold text-zinc-100">Trailer</h2>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl shadow-black/50 transition hover:border-red-400/40">
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.key}`}
            title={selectedVideo.name || "Movie trailer"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default TrailerEmbed;
