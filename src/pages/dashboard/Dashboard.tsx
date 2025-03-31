import { useEffect } from 'react';

import Table, { Column, PaginationConfig } from '@src/components/ui/Table';
import { Order } from '@src/models/order.model';
import { orderService } from '@src/services/order.service';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Loading } from '@src/components/ui/Loading';
import './Dashboard.css';
import Button from '@src/components/ui/Button';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ORDER_STATUS } from '@src/constants/order.constant';

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState<PaginationConfig>({
    currentPage: 1,
    itemPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await orderService.getOrders({ page: currentPage, limit: pageSize });
        setOrders(data.items);
        setPaginate({
          currentPage: data.meta.currentPage,
          itemPerPage: data.meta.itemsPerPage,
          totalItems: data.meta.totalItems,
          totalPages: data.meta.totalPages,
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleConfirm = (order: Order) => {
    alert(order.id);
  };

  const handleCancel = (order: Order) => {
    alert(order.id);
  };

  const columns: Column<Order>[] = [
    {
      key: 'id',
      title: 'Order ID',
    },
    {
      key: 'fullName',
      title: 'Full Name',
    },
    {
      key: 'phoneNumber',
      title: 'Phone Number',
    },
    {
      key: 'address',
      title: 'Address',
    },
    {
      key: 'totalPrice',
      title: 'Total',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`order-status order-status--${value}`}>
          {value === 'pending' ? 'Processing' : value === 'cancelled' ? 'Cancelled' : 'Finished'}
        </span>
      ),
    },
    {
      key: 'createdDate',
      title: 'Created Date',
      render: (value) => dayjs(value as string).format('DD/MM/YYYY'),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_value, record) => {
        if (record.status === ORDER_STATUS.PENDING) {
          return (
            <div>
              <Button
                icon={<FaCheck />}
                className="order-action-button-confirm"
                variant="ghost"
                size="sm"
                onClick={() => handleConfirm(record)}
              />
              <Button
                icon={<FaTimes />}
                className="order-action-button-cancel"
                variant="ghost"
                size="sm"
                onClick={() => handleCancel(record)}
              />
            </div>
          );
        }
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="order-page">
      <div className="order-page__header">
        <h1>Order history</h1>
      </div>

      <Table<Order>
        columns={columns}
        data={orders}
        loading={isLoading}
        pagination={paginate}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
