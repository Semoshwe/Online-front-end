import axiosInstance from '../axiosConfig'; // Assuming you have an axios instance setup

/**
 * Create a new order item.
 * @param {Object} orderItem - The order item to be created.
 * @returns {Promise<Object>} The created order item.
 */
export const createOrderItem = async (orderItem) => {
    try {
        const response = await axiosInstance.post('/order-items', orderItem);
        console.debug('Order item created successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'creating order item');
    }
};

/**
 * Get an order item by its ID.
 * @param {number} id - The ID of the order item to retrieve.
 * @returns {Promise<Object>} The retrieved order item.
 */
export const readOrderItem = async (id) => {
    try {
        const response = await axiosInstance.get(`/order-items/read/${id}`);
        console.debug('Order item retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'reading order item by ID');
    }
};

/**
 * Update an existing order item.
 * @param {number} id - The ID of the order item to update.
 * @param {Object} orderItem - The updated order item data.
 * @returns {Promise<Object>} The updated order item.
 */
export const updateOrderItem = async (id, orderItem) => {
    try {
        const response = await axiosInstance.put(`/order-items/update/${id}`, orderItem);
        console.debug('Order item updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'updating order item');
    }
};

/**
 * Get all order items.
 * @returns {Promise<Array>} A list of all order items.
 */
export const getAllOrderItems = async () => {
    try {
        const response = await axiosInstance.get('/order-items');
        console.debug('All order items retrieved successfully:', response.data);
        return response.data;
    } catch (error) {
        handleError(error, 'retrieving all order items');
    }
};

/**
 * Find all order items by order ID.
 * @param {number} orderID - The order ID to retrieve order items by.
 * @returns {Promise<Array>} A list of order items associated with the given order ID.
 */
export const findOrderItemsByOrderID = async (orderID) => {
    try {
        const response = await axiosInstance.get(`/order-items/order_id/${orderID}`);
        console.debug(`Order items for order ID ${orderID} retrieved successfully:`, response.data);
        return response.data;
    } catch (error) {
        handleError(error, `retrieving order items by order ID ${orderID}`);
    }
};

/**
 * Delete an order item by its ID.
 * @param {number} orderItemID - The ID of the order item to delete.
 * @returns {Promise<void>}
 */
export const deleteOrderItemByID = async (orderItemID) => {
    try {
        await axiosInstance.delete(`/order-items/${orderItemID}`);
        console.debug(`Order item with ID ${orderItemID} deleted successfully`);
    } catch (error) {
        handleError(error, `deleting order item by ID ${orderItemID}`);
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
