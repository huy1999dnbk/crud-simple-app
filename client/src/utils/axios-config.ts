import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: process.env.API_ENDPOINT,
})
