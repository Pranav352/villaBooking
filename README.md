![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Django REST](https://img.shields.io/badge/Backend-Django_REST-092E20?logo=django)

# Villa Booking Platform ![Status](https://img.shields.io/badge/status-active-brightgreen)

A full-stack web application for discovering and booking luxury villas. This project features a modern React frontend with Tailwind CSS and a robust Django REST Framework backend.

## 🚀 Tech Stack

### Frontend
- **React 19**: Modern UI library.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS 4**: For premium, responsive styling.
- **React Router 7**: For seamless client-side navigation.

### Backend
- **Django 4.2**: High-level Python web framework.
- **Django REST Framework (DRF)**: For building powerful APIs.
- **PostgreSQL**: Production-grade relational database.
- **JWT Authentication**: Secure stateless authentication using JSON Web Tokens (SimpleJWT).
- **Advanced Logic**: Built-in booking overlap prevention and dynamic availability checks.


---

## 🛠️ Project Structure

```text
.
├── Backend/                 # Django project (villa_backend)
│   ├── api/                 # Main API application
│   ├── villa_backend/       # Project configuration
│   ├── seed_villas.py      # Script to populate initial data
│   └── API_DOCUMENTATION.md # Detailed API reference
├── fronted_copy/            # React frontend application
│   ├── src/                 # Application source code
│   ├── public/              # Static assets
│   └── index.html           # Entry point
└── README.md                # Project overview
```

---
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-npm-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white)

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.x
- Node.js & npm
- PostgreSQL (ensure a database named `villabok_db` exists)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. (Optional) Seed the database with sample villas:
   ```bash
   python seed_villas.py
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd fronted_copy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---
![JWT Auth](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)
![REST API](https://img.shields.io/badge/API-REST-ff6f00)


## 📖 API Documentation
For detailed information about API endpoints, authentication, and data structures, please refer to the [API Documentation](Backend/API_DOCUMENTATION.md).

---

## 🌟 Latest Updates

We've recently added several powerful features to enhance the villa booking experience:

- **Villa Wishlist**: Save your favorite villas to a personal wishlist for easy access later.
- **Reviews & Ratings**: Share your experience and browse ratings from other travelers.
- **Dynamic Pagination**: Smoother browsing experience with server-side pagination for villa listings.
- **Contact Support**: Integrated contact form for direct inquiries and support requests.
- **Enhanced UI/UX**: Refined dashboard layouts, interactive buttons, and premium design polish across the app.

---

## ✨ Key Features
- **Villa Discovery**: Browse a curated list of luxury villas with high-quality images.
- **Advanced Filtering**: Filter villas by location, guest capacity, and price range.
- **Real-Time Availability**: Check if a villa is available for specific dates before booking.
- **Smart Booking System**: Prevents double-bookings with backend validation logic for overlapping dates.
- **Secure Authentication**: Integrated User registration and Token-based authentication.
- **Admin Dashboard**: Secure management of villas and bookings via the Django Admin interface.
- **Wishlist System**: Personal collection of favorite properties.
- **Reviews & Ratings**: Community-driven feedback and transparent rating system.
- **Contact Integration**: Easy communication with villa administrators.
- **User Profiles**: Automatic profile creation upon registration.


---

## 🔒 Licenses ![License](https://img.shields.io/badge/license-MIT-green)
This project is for demonstration purposes.

## 📸 Project Preview
<img width="1374" height="892" alt="Villa" src="https://github.com/user-attachments/assets/12cd6eb5-82d5-4584-8f18-96b57309d501" />

------

<img width="1329" height="854" alt="villa2" src="https://github.com/user-attachments/assets/f0b7cd14-6204-4bc9-a5a0-240913b7f503" />

------


<img width="1324" height="355" alt="villa3" src="https://github.com/user-attachments/assets/fd213acd-f216-41c8-839d-a142068be0d5" />

------
