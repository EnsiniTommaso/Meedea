import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.10.0.20:9000"
});

export default instance;
