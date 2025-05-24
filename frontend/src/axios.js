import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.13.0.3:6060",
  withCredentials: true,
});

export default instance;
