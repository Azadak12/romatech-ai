import axios from 'axios'
import { getAccessToken, setAccessToken } from './tokenStore'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let sessionExpiredHandler = null
export function onSessionExpired(handler) {
  sessionExpiredHandler = handler
}

let refreshPromise = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/refresh') || originalRequest?.url?.includes('/auth/login')

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true

      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${baseURL}/auth/refresh`, {}, { withCredentials: true })
            .finally(() => {
              refreshPromise = null
            })
        }
        const { data } = await refreshPromise
        setAccessToken(data.access_token)
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return api(originalRequest)
      } catch (refreshError) {
        setAccessToken(null)
        if (sessionExpiredHandler) sessionExpiredHandler()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  const detail = error?.response?.data?.error
  if (detail?.fields?.length) {
    return detail.fields.map((f) => f.msg).join(' ')
  }
  return detail?.message || fallback
}
