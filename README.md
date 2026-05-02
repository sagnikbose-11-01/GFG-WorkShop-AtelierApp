# The Atelier | Luxury Fashion Boutique

A high-end, multi-page luxury fashion boutique website featuring a sophisticated "Quiet Luxury" aesthetic merged with a vibrant, interactive "Liquid Neon" theme. Built with a performant FastAPI backend and a pixel-perfect Vanilla JavaScript frontend.

![Live Site](https://img.shields.io/badge/Live-Site-brightgreen?style=for-the-badge&link=https://atelier-app-817686999586.us-central1.run.app/)

## ✨ Features

- **Interactive Liquid Cursor**: A custom high-performance canvas-based gooey cursor effect with randomized neon trails and SVG filters.
- **Dual Theme System**: Seamless toggle between "Vibrant Neon Dark Mode" and "Quiet Luxury Light Mode" with state persistence.
- **Glassmorphic UI**: Modern interface using `backdrop-filter` for a premium, translucent feel across navigation, cart, and AI components.
- **Digital Concierge**: An AI-powered fashion assistant widget with simulated typing indicators and sophisticated style advice logic.
- **Shopping Cart**: Fully functional slide-out cart drawer with real-time price calculation and `localStorage` persistence across page navigations.
- **Multi-Page Architecture**: Dedicated pages for Boutique (Home), Heritage (Brand Story), and Contact (Bespoke Inquiries).
- **Responsive Design**: Optimized for both desktop and mobile viewing experiences.

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, Uvicorn, Pydantic
- **Frontend**: HTML5, CSS3 (Vanilla), ES6+ JavaScript
- **Infrastructure**: Docker, Google Cloud Run, Artifact Registry

## 📂 Project Structure

```text
/
├── backend/
│   └── main.py          # FastAPI application & API routes
├── frontend/
│   ├── static/          # CSS, JS, and Asset files
│   ├── index.html       # Boutique Home Page
│   ├── about.html       # Heritage Page
│   └── contact.html     # Contact Page
├── Dockerfile           # Production container configuration
├── requirements.txt     # Python dependencies
└── README.md
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sagnikbose-11-01/GFG-WorkShop-AtelierApp.git
   cd the-atelier
   ```

2. **Set up a virtual environment**:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**:
   ```bash
   uvicorn backend.main:app --reload
   ```
   Visit `http://localhost:8000` to see the site.

### Deployment (Google Cloud Run)

The project is pre-configured for Cloud Run deployment via Docker.

1. **Build and Submit to Artifact Registry**:
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/atelier-app
   ```

2. **Deploy**:
   ```bash
   gcloud run deploy atelier-app --image gcr.io/[PROJECT_ID]/atelier-app --platform managed --allow-unauthenticated
   ```


