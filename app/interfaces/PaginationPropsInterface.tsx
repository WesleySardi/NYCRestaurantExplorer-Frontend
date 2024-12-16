export interface IPaginationProps {
  currentPage: number;
  currentLimit: number;
  currentOrder: string;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
  handlePageOrder: (limit: string) => void;
}
