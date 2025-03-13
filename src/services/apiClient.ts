import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { RAWG_API_KEY, RAWG_API_URL } from "../config/config";

export interface FetchResponse<T> {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: RAWG_API_URL,
  params: {
    key: RAWG_API_KEY,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>  axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data);
  
  getDetails = (id: number | string) => axiosInstance.get<T>(this.endpoint + '/' + id).then((res) => res.data);
   
}

export default APIClient;
