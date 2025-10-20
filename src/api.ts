import axios from 'axios';

// This is the URL of your Task 1 Java backend
const API_URL = 'http://localhost:8080';

// Create an 'instance' of axios with the base URL
const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;