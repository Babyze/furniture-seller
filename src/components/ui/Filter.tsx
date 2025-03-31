/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiFilterLine } from 'react-icons/ri';
import { useState } from 'react';
import './Filter.css';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterConfig<T> {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: FilterOption[];
}

interface FilterProps<T> {
  filters: FilterConfig<T>[];
  onFilter: (filters: Record<string, any>) => void;
}

const Filter = <T extends Record<string, any>>({ filters, onFilter }: FilterProps<T>) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const handleFilterChange = (key: string, value: any) => {
    const newValues = { ...filterValues, [key]: value };
    setFilterValues(newValues);
    onFilter(newValues);
  };

  const renderFilterInput = (filter: FilterConfig<T>) => {
    const value = filterValues[filter.key as string] || '';

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
            className="filter__select"
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
            className="filter__input"
            placeholder={`Enter ${filter.label.toLowerCase()}`}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
            className="filter__input"
          />
        );

      default:
        return (
          <div className="filter__search">
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleFilterChange(filter.key as string, e.target.value)}
              className="filter__input"
              placeholder={`Search by ${filter.label.toLowerCase()}`}
            />
          </div>
        );
    }
  };

  if (!filters?.length) return null;

  return (
    <div className="filter">
      <button
        className={`filter__toggle ${showFilters ? 'is-active' : ''}`}
        onClick={() => setShowFilters(!showFilters)}
      >
        <RiFilterLine />
        <span>Filter</span>
      </button>

      <div className={`filter__content ${showFilters ? 'is-visible' : ''}`}>
        {filters.map((filter) => (
          <div key={filter.key as string} className="filter__item">
            <label className="filter__label">{filter.label}</label>
            {renderFilterInput(filter)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
