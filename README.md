# Villa Booking Platform

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
- **DRF Token Auth**: Secure token-based authentication.
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
   pip install django djangorestframework django-cors-headers psycopg2-binary
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

## 📖 API Documentation
For detailed information about API endpoints, authentication, and data structures, please refer to the [API Documentation](Backend/API_DOCUMENTATION.md).

---

## ✨ Key Features
- **Villa Discovery**: Browse a curated list of luxury villas with high-quality images.
- **Advanced Filtering**: Filter villas by location, guest capacity, and price range.
- **Real-Time Availability**: Check if a villa is available for specific dates before booking.
- **Smart Booking System**: Prevents double-bookings with backend validation logic for overlapping dates.
- **Secure Authentication**: Integrated User registration and Token-based authentication.
- **Admin Dashboard**: Secure management of villas and bookings via the Django Admin interface.
- **User Profiles**: Automatic profile creation upon registration.


---

## 🔒 Licenses
This project is for demonstration purposes.
