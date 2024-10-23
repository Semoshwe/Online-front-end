import axiosInstance from '../axiosConfig';

const BASE_URL = '/review';

class ReviewService {
  // Get all reviews
  getAllReviews() {
    console.log("Fetching all reviews...");
    return axiosInstance.get(`${BASE_URL}/getAll`)
        .then(response => {
          console.log("Received all reviews:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error("Error fetching all reviews:", error);
          throw error;
        });
  }

  // Get a review by ID
  getReviewById(id) {
    console.log(`Fetching review with ID: ${id}`);
    return axiosInstance.get(`${BASE_URL}/read/${id}`)
        .then(response => {
          console.log("Received review:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error(`Error fetching review with ID ${id}:`, error);
          throw error;
        });
  }

  // Create a new review
/*    createReview(reviewData) {
        console.log("Creating a new review:", reviewData);
        // Transform the data to match backend expectations
        const review = {
            rating: reviewData.rating,
            review: reviewData.review,
            product: { productId: parseInt(reviewData.productId) },  // Nest productId and ensure it's a number
            user: { userID: reviewData.userId }  // Nest userId
        };

        return axiosInstance.post(`${BASE_URL}/create`, review)
            .then(response => {
                console.log("Review created successfully:", response.data);
                return response.data;
            })
            .catch(error => {
                console.error("Error creating review:", error);
                throw error;
            });
    }*/

    createReview(review) {
        console.log("Creating a new review:", review);
        return axiosInstance.post(`${BASE_URL}/create`, review)
            .then(response => {
                // Manually set the product and user fields
                const createdReview = {
                    ...response.data,
                    product:  review.productId,
                    user: review.userId
                };
                console.log("Review created successfully:", createdReview);
                return createdReview;
            })
            .catch(error => {
                console.error("Error creating review:", error);
                throw error;
            });
    }

/*createReview(review) {
  console.log("Creating a new review:", review);
  return axiosInstance.post(`${BASE_URL}/create`, review)
      .then(response => {
        // Manually set the product and user fields
        const createdReview = {
          ...response.data,
          product:  {productId: review.productId},
          user: {userId: review.userId}

        };
        console.log("Review created successfully:", createdReview);
        return createdReview;
      })
      .catch(error => {
        console.error("Error creating review:", error);
        throw error;
      });
}*/

/*
    createReview(review) {
  console.log("Creating a new review:", review);
  return axiosInstance.post(`${BASE_URL}/create`, review)
      .then(response => {
        console.log("Review created successfully:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error creating review:", error);
        throw error;
      });
}*/



  // Filter reviews by rating
  filterReviewsByRating(rating) {
    console.log(`Fetching reviews with rating: ${rating}`);
    return axiosInstance.get(`${BASE_URL}/getByRating/${rating}`)
        .then(response => {
          console.log("Received reviews by rating:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error(`Error fetching reviews with rating ${rating}:`, error);
          throw error;
        });
  }

  // Get reviews by product ID
  getReviewsByProductId(productId) {
    console.log(`Fetching reviews for product ID: ${productId}`);
    return axiosInstance.get(`${BASE_URL}/getByProductId/${productId}`)
        .then(response => {
          console.log("Received reviews for product ID:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error(`Error fetching reviews for product ID ${productId}:`, error);
          throw error;
        });
  }

  // Get reviews by user ID
  getReviewsByUserId(userId) {
    console.log(`Fetching reviews by user ID: ${userId}`);
    return axiosInstance.get(`${BASE_URL}/getByUserId/${userId}`)
        .then(response => {
          console.log("Received reviews by user ID:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error(`Error fetching reviews for user ID ${userId}:`, error);
          throw error;
        });
  }

  // Update an existing review
  updateReview(review) {
    console.log("Updating review:", review);
    return axiosInstance.put(`${BASE_URL}/update`, review)
        .then(response => {
          console.log("Review updated successfully:", response.data);
          return response.data;
        })
        .catch(error => {
          console.error("Error updating review:", error);
          throw error;
        });
  }

  // Delete a review by ID
  deleteReview(id) {
    console.log(`Deleting review with ID: ${id}`);
    return axiosInstance.delete(`${BASE_URL}/delete/${id}`)
        .then(response => {
          console.log("Review deleted successfully");
          return response.data;
        })
        .catch(error => {
          console.error(`Error deleting review with ID ${id}:`, error);
          throw error;
        });
  }
}

export default new ReviewService();
