import axios from 'axios';

const API_BASE_URL = "http://localhost:9192/api";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }
}

export default new AuthService();