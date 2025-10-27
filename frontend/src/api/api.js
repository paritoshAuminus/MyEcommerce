import axios from "axios"

export const BASE_URL = 'http://localhost:8080'

// ✅ AXIOS INSTANCE
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 3000
})


// ✅ REQUEST INTERCEPTOR - runs before every request
axiosInstance.interceptors.request.use(
    (config) => config, 
    (error) => Promise.reject(error)
)

// ✅ REQUEST INTERCEPTOR - runs before every response
axiosInstance.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 400) {
        window.alert('form fields empty❗')
    } else if (error.response?.status === 409) {
        window.alert('Email already in use❗')
    } else {
        window.alert('Something went wrong ❌')
    }
    return Promise.reject(error)
})

export default axiosInstance
