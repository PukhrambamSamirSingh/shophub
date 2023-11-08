import axios from "axios"

export const apiRequests = axios.create({
    baseURL: "https://shophub-api.onrender.com/api",
    withCredentials: true
})