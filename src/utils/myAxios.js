import axios from "axios";
const myAxios = axios.create({
  baseURL: "http://192.168.100.75:4010",
  withCredentials: true,
});
export default myAxios;
