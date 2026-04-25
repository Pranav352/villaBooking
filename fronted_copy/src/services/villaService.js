import { apiRequest } from "./apiClient"

function mapVillaFromBackend(villa) {
  return {
    ...villa,
    pricePerNight: Number(villa.price_per_night),
    maxGuests: villa.max_guests,
    unavailableDates: villa.unavailable_dates || [],
    reviews: villa.reviews || [],
  }
}

export async function getAllVillas() {
  const data = await apiRequest("villas/")
  // Handle both paginated and non-paginated responses
  const villas = Array.isArray(data) ? data : data.results || []
  return villas.map(mapVillaFromBackend)
}

export async function getVillaById(villaId) {
  const data = await apiRequest(`villas/${villaId}/`)
  return mapVillaFromBackend(data)
}

export async function addVilla(villaPayload) {
  const formattedPayload = {
    ...villaPayload,
    price_per_night: Number(villaPayload.pricePerNight),
    max_guests: Number(villaPayload.maxGuests) || 4,
    description: villaPayload.description || "Comfortable private villa stay.",
    images: Array.isArray(villaPayload.images) ? villaPayload.images : [villaPayload.imageUrl].filter(Boolean),
    amenities: Array.isArray(villaPayload.amenities)
      ? villaPayload.amenities
      : String(villaPayload.amenities || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
  }
  
  delete formattedPayload.pricePerNight
  delete formattedPayload.maxGuests
  delete formattedPayload.imageUrl

  const data = await apiRequest("villas/", {
    method: "POST",
    body: formattedPayload,
  })
  return mapVillaFromBackend(data)
}

export async function updateVilla(villaId, villaPayload) {
  const formattedPayload = {
    ...villaPayload,
  }

  if (villaPayload.pricePerNight) {
    formattedPayload.price_per_night = Number(villaPayload.pricePerNight)
    delete formattedPayload.pricePerNight
  }
  
  if (villaPayload.maxGuests) {
    formattedPayload.max_guests = Number(villaPayload.maxGuests)
    delete formattedPayload.maxGuests
  }

  if (villaPayload.imageUrl) {
    formattedPayload.images = [villaPayload.imageUrl]
    delete formattedPayload.imageUrl
  }

  if (villaPayload.amenities && !Array.isArray(villaPayload.amenities)) {
    formattedPayload.amenities = String(villaPayload.amenities)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  const data = await apiRequest(`villas/${villaId}/`, {
    method: "PATCH",
    body: formattedPayload,
  })
  return mapVillaFromBackend(data)
}

export async function deleteVilla(villaId) {
  return await apiRequest(`villas/${villaId}/`, {
    method: "DELETE",
  })
}

export async function addReview(reviewPayload) {
  const formattedPayload = {
    villa: reviewPayload.villaId,
    user_name: reviewPayload.name,
    user_email: reviewPayload.email,
    rating: reviewPayload.rating,
    comment: reviewPayload.comment,
  }
  return await apiRequest("reviews/", {
    method: "POST",
    body: formattedPayload,
  })
}

export async function getAllReviews() {
  const data = await apiRequest("reviews/")
  return Array.isArray(data) ? data : data.results || []
}

export async function deleteReview(reviewId) {
  return await apiRequest(`reviews/${reviewId}/`, {
    method: "DELETE",
  })
}
