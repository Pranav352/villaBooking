const ADMIN_KEY = "villa_admin_session"
const ADMIN_CREDENTIALS = {
  email: "admin@villabook.com",
  password: "admin123",
}

export async function loginAdmin(username, password) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/api-token-auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, message: errorData.non_field_errors?.[0] || "Invalid credentials." }
    }

    const { token } = await response.json()
    const session = {
      username,
      token,
      role: "admin",
      loggedInAt: new Date().toISOString(),
    }
    localStorage.setItem(ADMIN_KEY, JSON.stringify(session))
    window.dispatchEvent(new Event("admin-auth-change"))
    return { success: true, session }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Server connection failed." }
  }
}

export function getAdminSession() {
  const data = localStorage.getItem(ADMIN_KEY)
  return data ? JSON.parse(data) : null
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_KEY)
  window.dispatchEvent(new Event("admin-auth-change"))
}

export function isAdminAuthenticated() {
  return Boolean(getAdminSession())
}
