import axios from 'axios';

class CityService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/cities
  createOneCity = async (requestBody) => {
    return this.api.post('/api/cities', requestBody);
  }

  // GET /api/cities
  getAllCities = async () => {
    return this.api.get('/api/cities');
  }

  // GET /api/cities/:id
  getOneCity = async (id) => {
    return this.api.get(`/api/cities/${id}`);
  }

  // PUT /api/cities/:id
  updateOneCity = async (id, requestBody) => {
    return this.api.put(`/api/cities/${id}`, requestBody);
  }

  // DELETE /api/cities/:id
  deleteCity = async (id) => {
    return this.api.delete(`/api/cities/${id}`);
  } 
}

// Create one instance of the service
const cityService = new CityService();

export default cityService;