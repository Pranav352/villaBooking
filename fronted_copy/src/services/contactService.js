import { apiRequest } from "./apiClient"

/**
 * Fetch all contact messages (admin-only endpoint).
 * Requires an admin token in localStorage via apiClient interceptor.
 */
export async function getContactMessages() {
  return apiRequest("contact/")
}

/**
 * Delete a contact message by ID.
 */
export async function deleteContactMessage(id) {
  return apiRequest(`contact/${id}/`, { method: "DELETE" })
}

/**
 * Submit a new contact message.
 */
export async function submitContactForm(data) {
  return apiRequest("contact/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
