import React from "react";
import { IPaginationProps } from "~/interfaces/PaginationPropsInterface";

const RestaurantTablePagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <div>
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className="px-10 text-lg cursor-pointer"
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </div>
        <div>
          <span className="flex-grow text-center text-lg">{currentPage}</span>
        </div>
        <div>
          <span>...</span>
        </div>
        <div>
          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            className="px-10 text-lg cursor-pointer"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTablePagination;
