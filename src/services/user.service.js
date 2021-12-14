import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
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

  currentUser = async () => {
    return this.api.get("/api/users/current");
  };

  updateCurrentUser = async (requestBody) => {
    return this.api.put("/api/users/current", requestBody);
  };

  getUsersProfile = async (userId) => {
    return this.api.get(`/api/users/${userId}`);
  };
}

// Create one instance of the service
const userService = new UserService();

export default userService;