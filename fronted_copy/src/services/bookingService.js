import { apiRequest } from "./apiClient"

function mapBookingFromBackend(booking) {
  return {
    ...booking,
    totalPrice: booking.total_price,
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    userEmail: booking.user_email,
    villaName: booking.villa_name,
    villaImage: booking.villa_image,
  }
}

export async function getBookings() {
  const data = await apiRequest("bookings/")
  // Handle both paginated and non-paginated responses
  const bookings = Array.isArray(data) ? data : data.results || []
  return bookings.map(mapBookingFromBackend)
}

export async function saveBooking(booking) {
  const formattedPayload = {
    villa: booking.villaId,
    user_email: booking.userEmail,
    name: booking.name,
    check_in: booking.checkIn,
    check_out: booking.checkOut,
    guests: Number(booking.guests),
    total_price: Number(booking.totalPrice),
    status: "pending",
  }

  const data = await apiRequest("bookings/", {
    method: "POST",
    body: formattedPayload,
  })
  return mapBookingFromBackend(data)
}

export async function cancelBooking(bookingId) {
  const data = await apiRequest(`bookings/${bookingId}/`, {
    method: "PATCH",
    body: { status: "cancelled" },
  })
  return mapBookingFromBackend(data)
}

export async function updateBookingStatus(bookingId, status) {
  const data = await apiRequest(`bookings/${bookingId}/`, {
    method: "PATCH",
    body: { status },
  })
  return mapBookingFromBackend(data)
}

export async function deleteBooking(bookingId) {
  return await apiRequest(`bookings/${bookingId}/`, {
    method: "DELETE",
  })
}
