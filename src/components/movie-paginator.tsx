// @ts-nocheck

import ReactPaginate from "react-paginate";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const LAST_PAGE = 20;

export const MoviesPaginator = ({
  currentPage,
  onPageChange,
}: {
  currentPage?: number;
  lastPage?: number;
  onPageChange?: (val: number) => void;
}) => {
  const forcePage = currentPage ? currentPage - 1 : undefined;

  return (
    <div className="movie-paginator-container">
      <ReactPaginate
        className="movie-paginator"
        pageCount={LAST_PAGE}
        forcePage={forcePage}
        onPageChange={(e) => onPageChange?.(e.selected + 1)}
        nextLabel={<FiChevronRight />}
        previousLabel={<FiChevronLeft />}
      />
      <style jsx global>{`
        .movie-paginator-container {
          display: flex;
          width: 100%;
          overflow: auto;
          justify-content: center;
        }

        .movie-paginator {
          list-style: none;
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 0;
        }

        .movie-paginator a {
          padding: 0 10px;
          height: 28px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: inline-grid;
          place-items: center;
        }

        .movie-paginator .next a,
        .movie-paginator .previous a {
          background: #222;
          color: white;
          padding: 0 20px;
        }

        .movie-paginator .next a {
          margin-left: 18px;
        }

        .movie-paginator .previous a {
          margin-right: 18px;
        }

        .movie-paginator a[aria-current="page"] {
          background: red;
          color: white;
        }
      `}</style>
    </div>
  );
};
