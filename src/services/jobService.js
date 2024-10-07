import axios from "axios";

// Base URL for the jobs API endpoint
export const API_URL = "https://testapi.getlokalapp.com/common/jobs?page=";

/**
 * Fetches jobs from the API for a given page number.
 * @param {number} page - The page number to fetch jobs from (must be greater than 0).
 * @returns {Promise<Array>} - A promise that resolves to an array of job results or an empty array if there's an error.
 */
export const fetchJobs = async (page) => {
  // Validate the page number; it must be greater than zero
  if (page < 1) {
    console.error("Invalid page number: should be greater than 0.");
    return []; // Return an empty array in case of invalid page number
  }

  try {
    // Make a GET request to the API to fetch jobs for the specified page
    const response = await axios.get(`${API_URL}${page}`);

    // Log the API response for debugging purposes
    console.log("API Response:", response.data.results);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return []; // Return an empty array in case of an error
  }
};
