import axios from "axios";

const instance = axios.create({ baseURL: "http://10.10.0.20:6060" });

export default instance;
