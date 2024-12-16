import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { IPaginationProps } from "~/interfaces/PaginationPropsInterface";

const RestaurantTablePagination: React.FC<IPaginationProps> = ({
  currentPage,
  currentLimit,
  currentOrder,
  totalPages,
  handlePageChange,
  handleLimitChange,
  handlePageOrder,
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
        <div className="pr-[1vw] text-lg cursor-pointer">
          <Select
            value={currentLimit.toString()}
            onValueChange={(value) => {
              handleLimitChange(parseInt(value));
            }}
          >
            <SelectTrigger id="pageLimit">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem className="cursor-pointer" value="10">
                10
              </SelectItem>
              <SelectItem className="cursor-pointer" value="20">
                20
              </SelectItem>
              <SelectItem className="cursor-pointer" value="30">
                30
              </SelectItem>
              <SelectItem className="cursor-pointer" value="40">
                40
              </SelectItem>
              <SelectItem className="cursor-pointer" value="50">
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={currentOrder}
            onValueChange={(value) => {
              handlePageOrder(value);
            }}
          >
            <SelectTrigger id="pageOrder">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem className="cursor-pointer" value="name">
                Name
              </SelectItem>
              <SelectItem className="cursor-pointer" value="grade">
                Grade
              </SelectItem>
              <SelectItem className="cursor-pointer" value="inspection_date">
                Inspection Date
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTablePagination;
