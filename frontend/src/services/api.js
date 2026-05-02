import axios from 'axios'

const api = axios.create({
  baseURL: 'https://taskflow-5x94.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api