# Ocean Adventure — Purva Ocean Adventures

A bespoke 3D web experience and expedition booking platform for **Purva Ocean Adventures**, featuring mindful scuba diving, marine conservation, and boutique journeys led by **Dr. Purva** in Maafushi, Maldives.

## 🌊 Architecture

```
├── frontend/             # Client-side React 19 + Vite + Tailwind CSS + Three.js / R3F
│   ├── src/
│   │   ├── components/   # UI widgets, Navigation, Modals
│   │   ├── sections/     # Hero, Upcoming Trips, Experiences, Host, Gallery, About, Contact
│   │   ├── three/        # Real-time Three.js underwater canvas & journey
│   │   ├── content.ts    # Content, itinerary, and API endpoints
│   │   └── index.css     # Design tokens and Tailwind styling
│   └── public/           # Marine photography & static assets
│
└── backend/              # Server-side API & reservation services
    └── README.md         # Planned endpoints (/api/inquiry) & integration specs
```

## 🚀 Running Locally

```bash
# Navigate to frontend and start development server
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`.

## 📦 Building for Production

```bash
cd frontend
npm run build
```

## ☁️ Deployment on Render

This repository includes a [`render.yaml`](./render.yaml) blueprint:
1. Connect this GitHub repository in [Render Dashboard](https://dashboard.render.com).
2. Choose **New > Blueprint** or create a **Static Site**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
