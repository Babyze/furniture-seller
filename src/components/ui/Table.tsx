/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from 'react';
import { RiFilterLine, RiSearchLine } from 'react-icons/ri';
import './Table.css';

export type FilterOperator = 'contains' | 'equals' | 'greater' | 'less' | 'between';

export interface FilterConfig<T> {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  operator?: FilterOperator;
  options?: { label: string; value: string | number }[];
}

export interface PaginationConfig {
  currentPage: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;
  pageSizeOptions?: number[];
}

export interface Column<T> {
  key: string;
  title: string;
  render?: (value: T[keyof T], record: T) => ReactNode;
  filterable?: boolean;
  width?: number | string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey?: keyof T | ((record: T) => string);
  className?: string;
  filters?: FilterConfig<T>[];
  onFilter?: (filters: Record<string, unknown>) => void;
  pagination?: PaginationConfig;
  onPageChange?: (page: number, pageSize: number) => void;
  loading?: boolean;
  emptyText?: string;
  totalItems?: number;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  rowKey = 'id' as keyof T,
  className = '',
  filters,
  onFilter,
  pagination,
  onPageChange,
  loading = false,
  emptyText = 'No data',
}: TableProps<T>) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({});
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage ?? 1);
  const [pageSize, setPageSize] = useState(pagination?.itemPerPage ?? 20);

  const handleFilterChange = (key: string, value: unknown) => {
    const newValues = { ...filterValues, [key]: value };
    setFilterValues(newValues);
    onFilter?.(newValues);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page, pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    onPageChange?.(1, newPageSize);
  };

  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey] ?? index);
  };

  const renderFilterInput = (filter: FilterConfig<T>) => {
    const value = filterValues[filter.key as string] || '';

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
            className="table__filter-select"
          >
            <option value="">All</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
            className="table__filter-input"
            placeholder={`Enter ${filter.label.toLowerCase()}`}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
            className="table__filter-input"
          />
        );

      default:
        return (
          <div className="table__filter-search">
            <RiSearchLine className="table__filter-search-icon" />
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
              className="table__filter-input"
              placeholder={`Search by ${filter.label.toLowerCase()}`}
            />
          </div>
        );
    }
  };

  const renderFilters = () => {
    if (!filters?.length) return null;

    return (
      <div className={`table__filters ${showFilters ? 'is-visible' : ''}`}>
        {filters.map((filter) => (
          <div key={filter.key as string} className="table__filter">
            <label className="table__filter-label">{filter.label}</label>
            {renderFilterInput(filter)}
          </div>
        ))}
      </div>
    );
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, pagination?.totalItems ?? 0);

  const renderPagination = () => {
    if (!pagination) return null;

    return (
      <div className="table__pagination">
        <div className="table__pagination-info">
          Displaying {startIndex + 1}-{endIndex} of {pagination.totalItems} results
        </div>

        <div className="table__pagination-actions">
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="table__pagination-size"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>

          <div className="table__pagination-buttons">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="table__pagination-button"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="table__pagination-button"
            >
              Prev
            </button>
            <span className="table__pagination-current">
              Page {currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="table__pagination-button"
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              disabled={currentPage === pagination.totalPages}
              className="table__pagination-button"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="table__loading">Loading...</div>;
  }

  if (!data.length) {
    return <div className="table__empty">{emptyText}</div>;
  }

  return (
    <div className={`table__wrapper ${className}`}>
      {filters && filters.length > 0 && (
        <div className="table__toolbar">
          <button
            className={`table__filter-toggle ${showFilters ? 'is-active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <RiFilterLine />
            <span>Filter</span>
          </button>
        </div>
      )}

      {renderFilters()}

      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                <div className="table__header-content">
                  <span>{column.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={getRowKey(record, index)}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(record[column.key as keyof T], record)
                    : String(record[column.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {renderPagination()}
    </div>
  );
};

export default Table;
