import axiosInstance from '../axiosConfig';


// Create a new user
export const registerUser = async (user) => {
    try {
        // Remove confirmPassword before sending
        const { confirmPassword, ...userDataToSend } = user;

        // Log the exact data being sent
        console.debug('Sending registration data:', userDataToSend);

        const response = await axiosInstance.post('/users/register', userDataToSend);
        console.debug('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Registration error response:', {
                status: error.response.status,
                data: error.response.data
            });
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/users/login', {
            email,
            password
        });
        
        const { token, user } = response.data;
        
        if (!token || !user) {
            throw new Error('Invalid response from server');
        }

        // Store token
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return {
            token,
            user
        };
    } catch (error) {
        console.error('Login error:', error);
        if (error.response?.status === 401) {
            throw new Error('Invalid email or password');
        }
        throw new Error(error.response?.data?.message || 'Failed to login. Please try again.');
    }
};
export const logoutUser = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
};