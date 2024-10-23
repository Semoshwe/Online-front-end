// src/services/publicService.js

import axiosInstance from '../axiosConfig';

// Helper function to handle Axios errors
const handleAxiosError = (error, action) => {
    if (error.response) {
        console.error(`Error ${action} - Response status:`, error.response.status);
        console.error(`Error ${action} - Response data:`, error.response.data);
    } else if (error.request) {
        console.error(`Error ${action} - No response received:`, error.request);
    } else {
        console.error(`Error ${action} - Request setup issue:`, error.message);
    }
    console.error(`Error ${action}:`, error);
};

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('/public/getAll');
        console.debug('Products fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products');
        throw error;
    }
};