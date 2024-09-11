// OrderService.jsx
import axiosInstance from '../axiosConfig';

// Create a new order
export const createOrder = async (order) => {
    try {
        const response = await axiosInstance.post('/order/create', order);
        // Debug statement for success
        console.debug('Order created successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error creating order:', error);
        throw error;
    }
};

// get an order by it's ID
export const readOrder = async (id) => {
    try {
        const response = await axiosInstance.get(`/order/read/${id}`);
        // Debug statement for success
        console.debug('Order read successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error reading order:', error);
        throw error;
    }
};

// Update an existing order
export const updateOrder = async (order) => {
    try {
        const response = await axiosInstance.post('/order/update', order);
        // Debug statement for success
        console.debug('Order updated successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error updating order:', error);
        throw error;
    }
};

// Get all orders
export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get('/order/all');
        // Debug statement for success
        console.debug('Orders fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Find orders by user ID
export const findOrdersByCustomerID = async (userID) => {
    try {
        const response = await axiosInstance.get(`/order/user/${userID}`);
        // Debug statement for success
        console.debug('Orders by user ID fetched successfully:', response.data);
        return response;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders by user ID:', error);
        throw error;
    }
};

// Find orders by status
export const findOrdersByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`/order/status/${status}`);
        // Debug statement for success
        console.debug('Orders by status fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders by status:', error);
        throw error;
    }
};

// Find orders by order date range
export const findOrdersByOrderDateBetween = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.get('/order/date-range', {
            params: { startDate, endDate }
        });
        // Debug statement for success
        console.debug('Orders by date range fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders by date range:', error);
        throw error;
    }
};

// Find orders by address ID
export const findOrdersByAddressID = async (addressID) => {
    try {
        const response = await axiosInstance.get(`/order/address/${addressID}`);
        // Debug statement for success
        console.debug('Orders by address ID fetched successfully:', response.data);
        return response;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders by address ID:', error);
        throw error;
    }
};

// Find orders by total price greater than
export const findOrdersByTotalPriceGreaterThan = async (totalPrice) => {
    try {
        const response = await axiosInstance.get(`/order/total-price/${totalPrice}`);
        // Debug statement for success
        console.log('response info: ', response);
        console.debug('Orders by total price fetched successfully  inside the OrderService:', response.data);
        return response;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders by total price:', error);
        throw error;
    }
};

// Find orders by order items ID
export const findOrdersByOrderItemsID = async (orderItemsID) => {
    try {
        const response = await axiosInstance.get(`/order/findByOrderItemsID/${orderItemsID}`);
        // Debug statement for success
        console.debug('Orders by order items ID fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error fetching orders by order items ID:', error);
        throw error;
    }
};

// Delete an order by ID
export const deleteOrderByID = async (orderID) => {
    try {
        await axiosInstance.delete(`/order/delete/${orderID}`);
        // Debug statement for success
        console.debug('Order deleted successfully');
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error deleting order:', error);
        throw error;
    }
};

// Delete orders by user ID deletes the order if customer cancels it
export const deleteOrdersByUserID = async (userID) => {
    try {
        await axiosInstance.delete(`/order/user/${userID}`);
        // Debug statement for success
        console.debug('Orders by user ID deleted successfully');
    } catch (error) {
        if (error.response) {
            // Debug statements for error responses
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Debug statement for no response
            console.error('No response received:', error.request);
        } else {
            // Debug statement for setup errors
            console.error('Error setting up request:', error.message);
        }
        console.error('Error deleting orders by user ID:', error);
        throw error;
    }
};
