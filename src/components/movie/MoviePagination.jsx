function MoviePagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 5;
  const safeTotalPages = Math.min(totalPages, 500);

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(safeTotalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (safeTotalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-lg mb-xl">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-variant/30 transition-all"
      >
        Previous
      </button>

      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 rounded-lg font-label-caps text-label-caps transition-all ${
            pageNum === currentPage
              ? "bg-primary-container text-on-primary-container font-bold"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant/30"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === safeTotalPages}
        className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-variant/30 transition-all"
      >
        Next
      </button>
    </div>
  );
}

export default MoviePagination;