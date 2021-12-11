import axios from 'axios';

class TripsService {
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

  // POST /api/examples
  createOneTrip = async (requestBody) => {
    return this.api.post('/api/examples', requestBody);
  }

  // GET /api/examples
  getAllTrips = async () => {
    return this.api.get('/api/trips');
  }

  // GET /api/examples/:id
  getOneTrip = async (id) => {
    return this.api.get(`/api/trips/${id}`);
  }

  // PUT /api/examples/:id
  updateOneTrip = async (id, requestBody) => {
    return this.api.put(`/api/trips/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteOneTrip = async (id) => {
    return this.api.delete(`/api/trips/${id}`);
  } 
}

// Create one instance of the service
const tripsService = new TripsService();

export default tripsService;