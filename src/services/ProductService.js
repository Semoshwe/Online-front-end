// src/services/productService.js

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

// Create a product
export const createProduct = async (product) => {
    try {
        const response = await axiosInstance.post('/product/create', product);
        console.debug("Product created:", response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating product');
        throw error;
    }
};

// Read a product by ID
export const readProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`/product/read/${id}`);
        console.debug('Product read successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'reading product');
        throw error;
    }
};

// Update a product by ID
export const updateProduct = async (id, product) => {
    try {
        const response = await axiosInstance.put(`/product/update/${id}`, product);
        console.debug('Product updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating product');
        throw error;
    }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
    try {
        await axiosInstance.delete(`/product/delete/${id}`);
        console.debug('Product deleted successfully');
    } catch (error) {
        handleAxiosError(error, 'deleting product');
        throw error;
    }
};

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('/product/getAll');
        console.debug('Products fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products');
        throw error;
    }
};

// Get products by name
export const getProductsByName = async (name) => {
    try {
        const response = await axiosInstance.get(`/product/name/${name}`);
        console.debug('Products by name fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products by name');
        throw error;
    }
};

// Get products by description
export const getProductsByDescription = async (description) => {
    try {
        const response = await axiosInstance.get(`/product/description/${description}`);
        console.debug('Products by description fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products by description');
        throw error;
    }
};

// Get products by category ID
export const getProductsByCategoryId = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/product/category/${categoryId}`);
        console.debug('Products by category ID fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products by category ID');
        throw error;
    }
};

// Get products by price range
export const getProductsByPriceRange = async (minPrice, maxPrice) => {
    try {
        const response = await axiosInstance.get(`/product/price`, {
            params: { minPrice, maxPrice }
        });
        console.debug('Products by price range fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products by price range');
        throw error;
    }
};

// Get products created after a specific date
export const getProductsCreatedAfter = async (createdAt) => {
    try {
        const response = await axiosInstance.get(`/product/created-after`, {
            params: { createdAt }
        });
        console.debug('Products created after date fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products created after date');
        throw error;
    }
};

// Get products updated before a specific date
export const getProductsUpdatedBefore = async (updatedAt) => {
    try {
        const response = await axiosInstance.get(`/product/updated-before`, {
            params: { updatedAt }
        });
        console.debug('Products updated before date fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching products updated before date');
        throw error;
    }
};

// export const searchProducts = async (keyWord) => {
//     try {
//         const response = await axiosInstance.get('/product/search', {
//             params: { keyword: keyWord } // Using the params object to pass query parameter
//         });
//         console.debug('Searching products with keyword:', keyWord, 'fetched successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         handleAxiosError(error, `searching for products with keyword: ${keyWord}`);
//         throw error;
//     }
// };

export const searchProducts = async (keyWord) => {
    try {
        const response = await axiosInstance.get(`/product/search?keyWord=${keyWord}`, {
            params: { keyWord }
        });
        console.debug('Searching products with key word: '+ keyWord + 'fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'searching for products with key word: '+ keyWord);
        throw error;
    }
};