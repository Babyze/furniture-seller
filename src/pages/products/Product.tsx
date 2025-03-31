import Button from '@src/components/ui/Button';
import Filter, { FilterConfig } from '@src/components/ui/Filter';
import Table, { Column, PaginationConfig } from '@src/components/ui/Table';
import { ROUTES } from '@src/constants/routes';
import { CategoryArea } from '@src/models/category-area.model';
import { Category } from '@src/models/category.model';
import { Product } from '@src/models/product.model';
import { categoryAreaService } from '@src/services/category-area.service';
import { categoryService } from '@src/services/category.service';
import { productService } from '@src/services/product.service';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import './product.css';

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryAreas, setCategoryAreas] = useState<CategoryArea[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginationConfig>({
    currentPage: 1,
    itemPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const fetchProducts = useCallback(
    async (page: number, size: number, filters?: Record<string, unknown>) => {
      try {
        setLoading(true);
        const response = await productService.getProducts(page, size, filters);
        setProducts(response.items);
        setPaginate({
          currentPage: response.meta.currentPage,
          itemPerPage: response.meta.itemsPerPage,
          totalItems: response.meta.totalItems,
          totalPages: response.meta.totalPages,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    },
    [setProducts, setPaginate, setLoading],
  );

  const fetchCategories = useCallback(async () => {
    const response = await categoryService.getCategories();
    setCategories(response);
  }, [setCategories]);

  const fetchCategoryAreas = useCallback(async () => {
    const response = await categoryAreaService.getCategoryAreas();
    setCategoryAreas(response);
  }, [setCategoryAreas]);

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
    fetchCategories();
    fetchCategoryAreas();
  }, [currentPage, pageSize, fetchProducts, fetchCategories, fetchCategoryAreas]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleEdit = (id: number) => {
    navigate(`/products/${id}`);
  };

  const columns: Column<Product>[] = [
    {
      key: 'name',
      title: 'Product Name',
      width: '30%',
    },
    {
      key: 'stock',
      title: 'Stock',
      width: '5%',
    },
    {
      key: 'measurements',
      title: 'Measurements',
      width: '15%',
    },
    {
      key: 'categoryName',
      title: 'Category',
      width: '20%',
    },
    {
      key: 'categoryAreaName',
      title: 'Area',
      width: '20%',
    },
    {
      key: 'createdDate',
      title: 'Created Date',
      width: '20%',
      render: (value) => dayjs(value as string).format('DD/MM/YYYY'),
    },
    {
      key: 'updatedDate',
      title: 'Updated Date',
      width: '20%',
      render: (value) => dayjs(value as string).format('DD/MM/YYYY'),
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '15%',
      render: (_: unknown, record: Product) => (
        <div className="table__actions">
          <Button variant="ghost" onClick={() => handleEdit(record.id)} icon={<FiEdit />} />
        </div>
      ),
    },
  ];

  const filters: FilterConfig<Product>[] = [
    {
      key: 'categoryId',
      label: 'Category',
      type: 'select',
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    },
    {
      key: 'categoryAreaId',
      label: 'Area',
      type: 'select',
      options: categoryAreas.map((categoryArea) => ({
        label: categoryArea.name,
        value: categoryArea.id,
      })),
    },
  ];

  const handleFilter = (filters: Record<string, unknown>) => {
    fetchProducts(currentPage, pageSize, filters);
  };

  return (
    <div className="product-page">
      <div className="product-page__header">
        <h1>Products</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(ROUTES.DASHBOARD.CREATE_PRODUCT)}
          icon={<RiAddLine />}
        >
          Add Product
        </Button>
      </div>

      <Filter<Product> filters={filters} onFilter={handleFilter} />

      <Table<Product>
        columns={columns}
        data={products}
        loading={loading}
        pagination={paginate}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
