import axiosInstance from '../axiosConfig';

// Create a new address
export const createAddress = async (address) => {
    try {
        const response = await axiosInstance.post('/address/create', address);
        // Debug statement for success
        console.debug('Address created successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating address');
    }
};

// Read an address by ID
export const readAddress = async (id) => {
    try {
        const response = await axiosInstance.get(`/address/${id}`);
        // Debug statement for success
        console.debug('Address read successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'reading address');
    }
};

// Update an existing address
export const updateAddress = async (address) => {
    try {
        const response = await axiosInstance.put('/address/update', address);
        // Debug statement for success
        console.debug('Address updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating address');
    }
};

// Get all addresses
export const getAllAddresses = async () => {
    try {
        const response = await axiosInstance.get('/address/all');
        // Debug statement for success
        console.debug('Addresses fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching addresses');
    }
};

// Delete an address by ID
export const deleteAddressById = async (id) => {
    try {
        await axiosInstance.delete(`/address/${id}`);
        // Debug statement for success
        console.debug('Address deleted successfully');
    } catch (error) {
        handleAxiosError(error, 'deleting address');
    }
};

// Get address by user ID
export const getAddressByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get('/address/user', { params: { userId } });
        // Debug statement for success
        console.debug('Address for userId fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by userId');
    }
};

// Get address by title
export const getAddressByTitle = async (title) => {
    try {
        const response = await axiosInstance.get(`/address/title/${title}`);
        // Debug statement for success
        console.debug('Addresses by title fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by title');
    }
};

// Get address by address line 1
export const getAddressByAddressLine1 = async (addressLine1) => {
    try {
        const response = await axiosInstance.get(`/address/address-line1/${addressLine1}`);
        // Debug statement for success
        console.debug('Addresses by address line 1 fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by address line 1');
    }
};

// Get address by address line 2
export const getAddressByAddressLine2 = async (addressLine2) => {
    try {
        const response = await axiosInstance.get(`/address/address-line2/${addressLine2}`);
        // Debug statement for success
        console.debug('Addresses by address line 2 fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by address line 2');
    }
};

// Get address by country
export const getAddressByCountry = async (country) => {
    try {
        const response = await axiosInstance.get(`/address/country/${country}`);
        // Debug statement for success
        console.debug('Addresses by country fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by country');
    }
};

// Get address by city
export const getAddressByCity = async (city) => {
    try {
        const response = await axiosInstance.get(`/address/city/${city}`);
        // Debug statement for success
        console.debug('Addresses by city fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by city');
    }
};

// Get address by postal code
export const getAddressByPostalCode = async (postalCode) => {
    try {
        const response = await axiosInstance.get(`/address/postal-code/${postalCode}`);
        // Debug statement for success
        console.debug('Addresses by postal code fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by postal code');
    }
};

// Get address by phone number
export const getAddressByPhoneNumber = async (phoneNumber) => {
    try {
        const response = await axiosInstance.get(`/address/phone-number/${phoneNumber}`);
        // Debug statement for success
        console.debug('Addresses by phone number fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by phone number');
    }
};

// Get address by created date after
export const getAddressByCreatedAtAfter = async (createdAt) => {
    try {
        const response = await axiosInstance.get(`/address/created-after/${createdAt}`);
        // Debug statement for success
        console.debug('Addresses created after fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by created date');
    }
};

// Get address by updated date
export const getAddressByUpdatedAt = async (date) => {
    try {
        const response = await axiosInstance.get(`/address/updated-after/${date}`);
        // Debug statement for success
        console.debug('Addresses updated after fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching address by updated date');
    }
};

// Utility function to handle Axios errors
const handleAxiosError = (error, action) => {
    if (error.response) {
        // Debug statements for error responses
        console.error(`Error response status (${action}):`, error.response.status);
        console.error(`Error response data (${action}):`, error.response.data);
    } else if (error.request) {
        // Debug statement for no response
        console.error(`No response received (${action}):`, error.request);
    } else {
        // Debug statement for setup errors
        console.error(`Error setting up request (${action}):`, error.message);
    }
    console.error(`Error (${action}):`, error);
    throw error;
};
