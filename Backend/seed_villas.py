import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'villa_backend.settings')
django.setup()

from api.models import Villa

villas_data = [
    {
        "name": "Azure Coast Retreat",
        "location": "Goa, India",
        "price_per_night": 289,
        "rating": 4.8,
        "max_guests": 6,
        "amenities": ["wifi", "pool", "parking", "kitchen", "beachfront"],
        "description": "Bright beachfront villa with an infinity pool, tropical garden, and spacious rooms for family escapes.",
        "images": [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        ],
        "unavailable_dates": ["2026-05-10", "2026-05-11", "2026-05-20"],
    },
    {
        "name": "Lakeview Serenity Villa",
        "location": "Udaipur, India",
        "price_per_night": 215,
        "rating": 4.6,
        "max_guests": 5,
        "amenities": ["wifi", "parking", "kitchen", "workspace"],
        "description": "Quiet hillside home overlooking a lake with sunset decks and airy interiors designed for relaxed stays.",
        "images": [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1612965607446-25e1332775ae?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        ],
        "unavailable_dates": ["2026-06-01", "2026-06-02", "2026-06-17"],
    },
    {
        "name": "Palm Breeze Estate",
        "location": "Bali, Indonesia",
        "price_per_night": 330,
        "rating": 4.9,
        "max_guests": 8,
        "amenities": ["wifi", "pool", "parking", "spa", "chef"],
        "description": "Premium villa with private chef options, lush garden courtyards, and open-plan luxury for groups.",
        "images": [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        ],
        "unavailable_dates": ["2026-05-22", "2026-05-23", "2026-06-09"],
    },
    {
        "name": "Cliffside Horizon Home",
        "location": "Santorini, Greece",
        "price_per_night": 410,
        "rating": 4.7,
        "max_guests": 4,
        "amenities": ["wifi", "pool", "parking", "ocean-view"],
        "description": "Iconic white-stone retreat with private plunge pool and panoramic views over the Aegean Sea.",
        "images": [
            "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
        ],
        "unavailable_dates": ["2026-04-30", "2026-05-01", "2026-05-14"],
    },
]

def seed():
    for data in villas_data:
        villa, created = Villa.objects.get_or_create(
            name=data['name'],
            defaults=data
        )
        if created:
            print(f"Created villa: {villa.name}")
        else:
            print(f"Villa already exists: {villa.name}")

if __name__ == '__main__':
    seed()
