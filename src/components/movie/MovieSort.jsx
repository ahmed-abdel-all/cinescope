function MovieSort({ sortBy, onSortChange }) {
  const options = [
    { value: "popularity.desc", label: "Popularity" },
    { value: "vote_average.desc", label: "Top Rated" },
    { value: "release_date.desc", label: "Newest" },
  ];

  return (
    <div className="flex items-center gap-3">
      <label className="font-label-caps text-label-caps text-on-surface-variant/60 uppercase">
        Sort By
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MovieSort;