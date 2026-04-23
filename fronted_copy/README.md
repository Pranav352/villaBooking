# Villa Book - Frontend

A React-based administrative dashboard for managing luxury villa listings, built with **Vite** and styled with **Tailwind CSS**.

## 🚀 Features

*   **Villa Management**: Full CRUD operations (Create, Read, Update, Delete) for villa data.
*   **Data Table**: Organized view of all available villas including location, price, and amenities.
*   **Image Compression**: Automatic client-side image resizing and compression (JPEG 0.7) using Canvas API before saving.
*   **Interactive UI**: Smooth modals for data entry and toast notifications for user feedback.
*   **Responsive Design**: Built with Tailwind CSS to work across various screen sizes.

## 🛠 Tech Stack

*   **React**: UI Library
*   **Vite**: Build tool and development server
*   **Tailwind CSS**: Styling
*   **Lucide React**: Icon set
*   **Services**: Modularized API handlers for villa data

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

*   `src/admin/pages`: Main application views (e.g., `ManageVillasPage`).
*   `src/admin/components`: Reusable UI elements like `DataTable`, `FormModal`, and `Toast`.
*   `src/services`: API service layers for communicating with the backend.
