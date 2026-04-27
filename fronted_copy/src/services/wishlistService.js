import { apiRequest } from "./apiClient";
import { getAllVillas } from "./villaService"; // Just to have access to the mapping indirectly if needed, or I can define it here.

function mapVillaFromBackend(villa) {
  if (!villa) return null;
  return {
    ...villa,
    pricePerNight: Number(villa.price_per_night),
    maxGuests: villa.max_guests,
    unavailableDates: villa.unavailable_dates || [],
    reviews: villa.reviews || [],
  }
}

export async function getWishlist(email) {
  if (!email) return [];
  const data = await apiRequest(`wishlist/?user_profile__email=${email}`);
  const items = Array.isArray(data) ? data : data.results || [];
  
  return items.map(item => ({
    ...item,
    villa_details: mapVillaFromBackend(item.villa_details)
  }));
}

export async function toggleWishlist(villaId, email) {
  if (!email) throw new Error("Please log in to save villas.");
  return await apiRequest("wishlist/toggle/", {
    method: "POST",
    body: { villa_id: villaId, email },
  });
}
