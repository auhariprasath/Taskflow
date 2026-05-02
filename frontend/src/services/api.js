import axios from 'axios'

const api = axios.create({
  baseURL: 'https://taskflow-5x94.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message)
    console.error('URL:', error.config?.url)
    console.error('Response:', error.response?.status)
    return Promise.reject(error)
  }
)

export default api