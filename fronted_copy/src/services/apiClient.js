import axios from "axios"

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    const adminSession = JSON.parse(localStorage.getItem("villa_admin_session") || "null")
    if (adminSession?.token) {
      config.headers.Authorization = `Token ${adminSession.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export async function apiRequest(endpoint, options = {}) {
  const { method = "GET", body, headers = {} } = options

  try {
    const response = await apiClient({
      url: endpoint,
      method,
      data: body,
      headers,
    })

    return response.data
  } catch (error) {
    // Extract error message from the new standardized backend format
    const backendData = error.response?.data
    const errorMessage = backendData?.message || backendData?.detail || error.message || "Something went wrong"

    // Log details for developers if they exist
    if (backendData?.details) {
      console.error(`API Validation Error (${endpoint}):`, backendData.details)
    } else {
      console.error(`API Error (${endpoint}):`, errorMessage)
    }

    throw new Error(errorMessage)
  }
}

export default apiClient
