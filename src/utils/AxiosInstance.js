import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:5298/api"
});

export default AxiosInstance;