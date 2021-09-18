import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://fresh.test/api/user',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default axiosInstance