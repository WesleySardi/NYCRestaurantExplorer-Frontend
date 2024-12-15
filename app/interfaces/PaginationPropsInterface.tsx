export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}
