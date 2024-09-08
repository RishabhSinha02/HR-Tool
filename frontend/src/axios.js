import axios from "axios";
import { PORT } from "./congif";
axios.defaults.withCredentials = true;

const axiosnew = axios.create({
  baseURL: "http://localhost:" + PORT,
  withCredentials: true,
});


axiosnew.defaults.withCredentials = true;
export default axiosnew;
