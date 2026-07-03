function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
      <div className="aspect-[2/3] animate-pulse bg-zinc-800" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
      </div>
    </div>
  );
}

export default SkeletonCard;
