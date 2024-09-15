import axios from 'axios';

// Endpoint to get presigned URL
const PRESIGNED_URL = 'http://localhost:8080/shopping_store/s3/presigned-url';

// Function to get presigned URL from the backend
const getPresignedUrl = async (fileName, contentType) => {
    try {
        const response = await axios.post(PRESIGNED_URL, null, {
            params: { fileName, contentType } // Send params in the request
        });
        return response.data; // { url: '...' }
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
};

// Function to upload a file to S3 using the presigned URL
export const uploadFileToS3 = async (file) => {
    try {
        const { name: fileName, type: contentType } = file;

        // Get presigned URL
        const { url: presignedUrl } = await getPresignedUrl(fileName, contentType);

        // Upload file to S3 using presigned URL
        await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': contentType,
            },
        });

        // Return the URL of the uploaded file
        return presignedUrl.split('?')[0]; // The URL without query parameters
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};