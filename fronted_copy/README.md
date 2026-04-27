# Villa Book - Frontend

A React-based administrative dashboard for managing luxury villa listings, built with **Vite** and styled with **Tailwind CSS**.

## 🚀 Features

*   **Villa Management**: Full CRUD operations for villa data.
*   **Wishlist Support**: User-friendly wishlist management for saving favorite villas.
*   **Reviews System**: Integrated rating and review interface for villa detail pages.
*   **Pagination**: Advanced pagination logic for browsing large villa collections.
*   **Image Compression**: Automatic client-side image resizing and compression.
*   **Interactive UI**: Smooth modals, hover effects, and premium transitions.

## 🛠 Tech Stack

*   **React 19**: UI Library
*   **Vite**: Build tool and development server
*   **Tailwind CSS 4**: Styling
*   **Lucide React**: Icon set
*   **React Router 7**: Navigation
*   **Services**: Modularized API handlers for villas, bookings, reviews, and wishlist.

## 📦 Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the development server:
```bash
npm run dev
```

### Production

Build the application:
```bash
npm run build
```

## 📝 Project Structure

*   `src/admin/pages`: Administrative management views.
*   `src/admin/components`: Admin UI elements (DataTable, FormModal).
*   `src/components`: Public-facing reusable components (VillaCard, Pagination, ReviewSection).
*   `src/services`: API service layers for Backend communication.
*   `src/hooks`: Custom hooks for state and side-effect management.
