export interface Pagination<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PaginationRequestQuery {
  page?: number;
  limit?: number;
}
