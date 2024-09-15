import axiosInstance from '../axiosConfig';
//import bcrypt from 'bcryptjs';

// Create a new user
export const createUser = async (user) => {
    try {
        const response = await axiosInstance.post('/users/create', user);
        // Debug statement for success
        console.debug('User created successfully:', response.data);
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
        console.error('Error creating user:', error);
        throw error;
    }
};



// Login function (no bcrypt)
export const loginUser = async (username, password) => {
    try {
        // Send username and password to backend API
        const response = await axiosInstance.post('/login', { username, password });
        
        // Debug for successful login
        console.debug('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};


// Read a user by ID
export const readUser = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        // Debug statement for success
        console.debug('User read successfully:', response.data);
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
        console.error('Error reading user:', error);
        throw error;
    }
};

// Update an existing user
export const updateUser = async (id, user) => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, user);
        // Debug statement for success
        console.debug('User updated successfully:', response.data);
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
        console.error('Error updating user:', error);
        throw error;
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        // Debug statement for success
        console.debug('Users fetched successfully:', response.data);
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
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Delete a user by ID
export const deleteUserById = async (id) => {
    try {
        await axiosInstance.delete(`/users/${id}`);
        // Debug statement for success
        console.debug('User deleted successfully');
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
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Find a user by email
export const findUserByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`/users/email/${email}`);
        // Debug statement for success
        console.debug('User found successfully by email:', response.data);
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
        console.error('Error finding user by email:', error);
        throw error;
    }
};

// Find users by first name
export const findUsersByFirstName = async (firstName) => {
    try {
        const response = await axiosInstance.get(`/users/firstName/${firstName}`);
        // Debug statement for success
        console.debug('Users found successfully by first name:', response.data);
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
        console.error('Error finding users by first name:', error);
        throw error;
    }
};

// Find users by last name
export const findUsersByLastName = async (lastName) => {
    try {
        const response = await axiosInstance.get(`/users/lastName/${lastName}`);
        // Debug statement for success
        console.debug('Users found successfully by last name:', response.data);
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
        console.error('Error finding users by last name:', error);
        throw error;
    }
};

// Find users by birth date
export const findUsersByBirthDate = async (birthDate) => {
    try {
        const response = await axiosInstance.get(`/users/birthDate/${birthDate}`);
        // Debug statement for success
        console.debug('Users found successfully by birth date:', response.data);
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
        console.error('Error finding users by birth date:', error);
        throw error;
    }
};

// Find users by phone number
export const findUsersByPhoneNumber = async (phoneNumber) => {
    try {
        const response = await axiosInstance.get(`/users/phoneNumber/${phoneNumber}`);
        // Debug statement for success
        console.debug('Users found successfully by phone number:', response.data);
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
        console.error('Error finding users by phone number:', error);
        throw error;
    }
};

// Find users by role
export const findUsersByRole = async (role) => {
    try {
        const response = await axiosInstance.get(`/users/role/${role}`);
        // Debug statement for success
        console.debug('Users found successfully by role:', response.data);
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
        console.error('Error finding users by role:', error);
        throw error;
    }
};

// Find a user by username (email)
export const findUserByUsername = async (username) => {
    try {
        const response = await axiosInstance.get(`/users/username/${username}`);
        // Debug statement for success
        console.debug('User found successfully by username:', response.data);
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
        console.error('Error finding user by username:', error);
        throw error;
    }
};
