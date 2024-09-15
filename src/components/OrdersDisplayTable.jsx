import * as React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import OrderDialogs from '../inputs/OrderDialogs';
import { readAddress } from '../services/AddressService'; // Import address service
import { findOrderItemsByOrderID } from '../services/OrderItemService'; // Import order items service
import dayjs from 'dayjs'; // Import Day.js

 const parseLocalDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return null;
  return dayjs(dateTimeStr);
}; 

const columns = [
  { field: 'id', headerName: 'Order ID', width: 100 }, // Use 'id' instead of 'orderID'
  { field: 'userID', headerName: 'User ID', width: 100 },
  { field: 'addressID', headerName: 'Address ID', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'totalPrice', headerName: 'Total Price', width: 100, type: 'number' },
  { field: 'orderDate', headerName: 'Order Date', width: 100, type: 'date' },
  {
    field: 'orderItemCount',
    headerName: 'Total Items',
    width: 90,
    valueGetter: (params) => params.row.orderItemCount || 'Loading...',
  },
];

export default function DataTable({ rows }) {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [orderItemCounts, setOrderItemCounts] = React.useState({});
  const navigate = useNavigate();

  const fetchOrderItemsCount = async (id) => {
    try {
      const response = await findOrderItemsByOrderID(id); 
      return Array.isArray(response.data) ? response.data.length : 0;
    } catch (error) {
      console.error('Error fetching order items:', error);
      return 0;
    }
  };

  React.useEffect(() => {
    const fetchAllOrderItemCounts = async () => {
      const counts = {};
      for (let row of rows) {
        const count = await fetchOrderItemsCount(row.id); // Use 'id' instead of 'orderID'
        counts[row.id] = count;
      }
      setOrderItemCounts(counts);
    };
    fetchAllOrderItemCounts();
  }, [rows]);

  const rowsWithItemCount = rows.map((row) => ({
    ...row,
    orderItemCount: orderItemCounts[row.id] || 'Loading...', // Use 'id' instead of 'orderID'
  }));

  const handleRowClick = (params) => {
    navigate(`/order-items/${params.row.id}`); // Use 'id' for redirection
  };

  const handleCellClick = async (params) => {
    if (params.field === 'addressID') {
      try {
        const response = await readAddress.read(params.value);
        setAddress(response.data);
        setOpen(true);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAddress(null);
  };

  return (
    <div style={{ height: 400, width: '70%' }}>
      <DataGrid
        rows={rowsWithItemCount}
        columns={columns}
        getRowId={(row) => row.id} // Use 'id'
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
      />
      <OrderDialogs open={open} address={address} handleClose={handleClose} />
    </div>
  );
}

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Use 'id'
      userID: PropTypes.number.isRequired,
      addressID: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      orderDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};
