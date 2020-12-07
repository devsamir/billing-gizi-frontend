import axios from "axios";
const myAxios = axios.create({
  baseURL: "http://192.168.100.81:5030",
  withCredentials: true,
});
export default myAxios;
