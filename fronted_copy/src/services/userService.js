import { apiRequest } from "./apiClient"

export async function getUsers() {
  const data = await apiRequest("user-profiles/")
  // Handle both paginated and non-paginated responses
  return Array.isArray(data) ? data : data.results || []
}

export async function upsertUser(userPayload) {
  const users = await getUsers()
  const existing = users.find((user) => user.email === userPayload.email)

  if (existing) {
    return await apiRequest(`user-profiles/${existing.id}/`, {
      method: "PATCH",
      body: userPayload,
    })
  } else {
    return await apiRequest("user-profiles/", {
      method: "POST",
      body: userPayload,
    })
  }
}

export async function deleteUser(userId) {
  return await apiRequest(`user-profiles/${userId}/`, {
    method: "DELETE",
  })
}
