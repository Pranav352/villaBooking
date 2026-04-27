# Villa Booking API Documentation

This document provides a comprehensive overview of the REST API endpoints available in the Villa Booking project.

## Base URL
The API is accessible at:
`http://127.0.0.1:8000/api/`

---

## Authentication

The API supports **Token-based Authentication**.

### Get Authentication Token
To obtain a token, send a `POST` request with your credentials.

- **Endpoint**: `/api/api-token-auth/`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
  }
  ```

### Usage
Include the token in the `Authorization` header of your requests:
`Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

### 4. Registration
Register a new user account.

- **Endpoint**: `/api/register/`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "password": "Password123!",
    "email": "user@example.com",
    "name": "Full Name"
  }
  ```
- **Response**: `{"message": "User registered successfully"}`


---

## Endpoints

### 1. Villas
Manage villa listings.

| Method | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/villas/` | List all villas | AllowAny |
| `POST` | `/api/villas/` | Create a new villa | IsAdminUser |
| `GET` | `/api/villas/{id}/` | Get villa details | AllowAny |
| `GET` | `/api/villas/{id}/check_availability/` | Check villa availability | AllowAny |
| `PUT` | `/api/villas/{id}/` | Update a villa | IsAdminUser |
| `PATCH` | `/api/villas/{id}/` | Partial update | IsAdminUser |
| `DELETE` | `/api/villas/{id}/` | Delete a villa | IsAdminUser |

#### Filtering (Query Parameters)
Filter the `/api/villas/` list:
- `location`: Search by city/area (icontains).
- `max_guests`: Minimum capacity required.
- `min_price`: Minimum price per night.
- `max_price`: Maximum price per night.

Example: `/api/villas/?location=Goa&max_guests=4`


#### Villa Object Structure
```json
{
  "id": 1,
  "name": "Luxury Ocean View Villa",
  "location": "Maldives",
  "price_per_night": "500.00",
  "rating": 4.8,
  "max_guests": 6,
  "description": "A beautiful villa with panoramic ocean views.",
  "images": ["url1", "url2"],
  "amenities": ["Pool", "WiFi", "AC"],
  "unavailable_dates": ["2026-05-01", "2026-05-05"]
}
```

---

### 2. User Profiles
Manage user profile information.

| Method | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user-profiles/` | List all profiles | AllowAny |
| `POST` | `/api/user-profiles/` | Create a profile | AllowAny |
| `GET` | `/api/user-profiles/{id}/` | Get profile details | AllowAny |
| `PUT` | `/api/user-profiles/{id}/` | Update profile | AllowAny |
| `DELETE` | `/api/user-profiles/{id}/` | Delete profile | AllowAny |

#### User Profile Object Structure
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-04-17T17:23:09Z"
}
```

---

### 3. Bookings
Manage villa bookings.

| Method | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings/` | List all bookings | AllowAny |
| `POST` | `/api/bookings/` | Create a booking | AllowAny |
| `GET` | `/api/bookings/{id}/` | Get booking details | AllowAny |
| `PUT` | `/api/bookings/{id}/` | Update booking | AllowAny |
| `DELETE` | `/api/bookings/{id}/` | Cancel booking | AllowAny |

#### Booking Object Structure
```json
{
  "id": 1,
  "villa": 1,
  "villa_name": "Luxury Ocean View Villa",
  "name": "John Doe",
  "user_email": "john@example.com",
  "check_in": "2026-05-10",
  "check_out": "2026-05-15",
  "guests": 2,
  "total_price": "2500.00",
  "status": "confirmed",
  "created_at": "2026-04-17T17:23:09Z"
}
```

---

### 4. Reviews
Manage villa reviews and ratings.

| Method | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews/` | List all reviews | AllowAny |
| `POST` | `/api/reviews/` | Create a new review | AllowAny |
| `GET` | `/api/reviews/{id}/` | Get review details | AllowAny |
| `DELETE` | `/api/reviews/{id}/` | Delete a review | AllowAny |

#### Review Object Structure
```json
{
  "id": 1,
  "villa": 1,
  "user_name": "Alice Smith",
  "user_email": "alice@example.com",
  "rating": 5,
  "comment": "Incredible stay! Highly recommend.",
  "created_at": "2026-04-25T10:00:00Z"
}
```

---

### 5. Wishlist
Manage personal villa wishlists.

| Method | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/wishlist/` | List current user's wishlist | AllowAny |
| `POST` | `/api/wishlist/` | Add a villa to wishlist | AllowAny |
| `DELETE` | `/api/wishlist/{id}/` | Remove from wishlist | AllowAny |

#### Wishlist Object Structure
```json
{
  "id": 1,
  "user_profile": 1,
  "villa": 1,
  "villa_details": {
    "name": "Luxury Ocean View Villa",
    "location": "Maldives",
    "price_per_night": "500.00"
  },
  "added_at": "2026-04-27T08:30:00Z"
}
```

---

### 6. Contact Messages
Support and inquiry management.

| Method | Endpoint | Description | Permissions |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact/` | Submit a contact inquiry | AllowAny |
| `GET` | `/api/contact/` | List all inquiries | IsAdminUser |
| `GET` | `/api/contact/{id}/` | Get inquiry details | IsAdminUser |

#### Contact Object Structure
```json
{
  "id": 1,
  "name": "Bob Brown",
  "email": "bob@example.com",
  "message": "I have a question about the Maldives villa.",
  "created_at": "2026-04-25T12:00:00Z"
}
```

---

## Status Codes

- `200 OK`: Request succeeded.
- `201 Created`: Resource created successfully.
- `400 Bad Request`: Invalid data provided.
- `401 Unauthorized`: Authentication credentials missing or invalid.
- `403 Forbidden`: You do not have permission to perform this action.
- `404 Not Found`: Resource does not exist.
