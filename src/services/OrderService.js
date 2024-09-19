// OrderService.jsx
import axiosInstance from '../axiosConfig';

/**
 * Create a new order
 * @param {Object} order - The order object to be created.
 * @returns {Promise<Object>} - The created order data.
 */
export const createOrder = async (order) => {
    try {
        const response = await axiosInstance.post('/order/create', order);
        console.debug('Order created successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'creating order');
    }
};

/**
 * Get an order by its ID
 * @param {number} id - The ID of the order to be fetched.
 * @returns {Promise<Object>} - The order data.
 */
export const readOrder = async (id) => {
    try {
        const response = await axiosInstance.get(`/order/read/${id}`);
        console.debug('Order read successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'reading order');
    }
};

/**
 * Update an existing order
 * @param {Object} order - The order object to be updated.
 * @returns {Promise<Object>} - The updated order data.
 */
export const updateOrder = async (order) => {
    try {
        const response = await axiosInstance.post('/order/update', order);
        console.debug('Order updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'updating order');
    }
};

/**
 * Get all orders
 * @returns {Promise<Array>} - List of all orders.
 */
export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get('/order/all');
        console.debug('Orders fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'fetching orders');
    }
};

/**
 * Find orders by user ID
 * @param {number} userID - The user ID to fetch orders by.
 * @returns {Promise<Array>} - List of orders by the user ID.
 */
export const findOrdersByCustomerID = async (userID) => {
    try {
        const response = await axiosInstance.get(`/order/user/${userID}`);
        console.debug('Orders by user ID fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'fetching orders by user ID');
    }
};

/**
 * Find orders by status
 * @param {string} status - The status to filter orders by.
 * @returns {Promise<Array>} - List of orders by status.
 */
export const findOrdersByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`/order/status/${status}`);
        console.debug('Orders by status fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'fetching orders by status');
    }
};

/**
 * Find orders by date range
 * @param {string} startDate - The start date for filtering orders.
 * @param {string} endDate - The end date for filtering orders.
 * @returns {Promise<Array>} - List of orders in the specified date range.
 */
export const findOrdersByOrderDateBetween = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.get('/order/date-range', { params: { startDate, endDate } });
        console.debug('Orders by date range fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'fetching orders by date range');
    }
};

/**
 * Find orders by address ID
 * @param {number} addressID - The address ID to fetch orders by.
 * @returns {Promise<Array>} - List of orders by address ID.
 */
export const findOrdersByAddressID = async (addressID) => {
    try {
        const response = await axiosInstance.get(`/order/address/${addressID}`);
        console.debug('Orders by address ID fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'fetching orders by address ID');
    }
};

/**
 * Find orders by total price greater than
 * @param {number} totalPrice - The minimum total price to filter orders.
 * @returns {Promise<Array>} - List of orders with total price greater than specified.
 */
export const findOrdersByTotalPriceGreaterThan = async (totalPrice) => {
    try {
        const response = await axiosInstance.get(`/order/total-price/${totalPrice}`);
        console.debug('Orders by total price fetched successfully:', response.data);
        return response;
    } catch (error) {
        handleError(error, 'fetching orders by total price');
    }
};

/**
 * Find orders by order items ID
 * @param {number} orderItemsID - The order items ID to fetch orders by.
 * @returns {Promise<Array>} - List of orders by order items ID.
 */
export const findOrdersByOrderItemsID = async (orderItemsID) => {
    try {
        const response = await axiosInstance.get(`/order/findByOrderItemsID/${orderItemsID}`);
        console.debug('Orders by order items ID fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'fetching orders by order items ID');
    }
};

/**
 * Delete an order by ID
 * @param {number} orderID - The ID of the order to be deleted.
 */
export const deleteOrderByID = async (orderID) => {
    try {
         await axiosInstance.delete(`/order/delete/${orderID}`);
        console.debug('Order deleted successfully');
        return true; // Explicitly returning true for success
    } catch (error) {
        handleError(error, 'deleting order');
        return false; // Returning false on failure
    }
};

/**
 * Delete orders by user ID
 * @param {number} userID - The user ID to delete orders by.
 */
export const deleteOrdersByUserID = async (userID) => {
    try {
        await axiosInstance.delete(`/order/user/${userID}`);
        console.debug('Orders by user ID deleted successfully');
    } catch (error) {
        handleError(error, 'deleting orders by user ID');
    }
};

/**
 * Common error handler for API requests.
 * @param {Object} error - The error object thrown during the request.
 * @param {string} action - The action being performed (e.g., creating, updating).
 */
const handleError = (error, action) => {
    if (error.response) {
        console.error(`Error response status (${action}):`, error.response.status);
        console.error(`Error response data (${action}):`, error.response.data);
    } else if (error.request) {
        console.error(`No response received (${action}):`, error.request);
    } else {
        console.error(`Error setting up request (${action}):`, error.message);
    }
    console.error(`Error ${action}:`, error);
    throw error;
};
