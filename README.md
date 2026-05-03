# The Atelier | Luxury Fashion Boutique

A high-end, multi-page luxury fashion boutique website featuring a sophisticated "Quiet Luxury" aesthetic merged with a vibrant, interactive "Liquid Neon" theme. Built with a performant FastAPI backend and a pixel-perfect Vanilla JavaScript frontend, containerized with Docker and deployed on Google Cloud Run.

**Live Site:** [https://atelier-app-817686999586.us-central1.run.app/](https://atelier-app-817686999586.us-central1.run.app/)

---

## 📖 Project Overview

**The Atelier** is a modern fashion e-commerce platform that combines a robust Python backend with a high-performance, interactive frontend. The application provides a seamless, premium shopping experience with a "Liquid Neon" visual identity, fully containerized for global scalability and reliability.

## ✨ Features

- **Interactive Liquid Cursor**: A custom high-performance canvas-based gooey cursor effect with randomized neon trails and SVG filters.
- **Dual Theme System**: Seamless toggle between "Vibrant Neon Dark Mode" and "Quiet Luxury Light Mode" with state persistence.
- **Glassmorphic UI**: Modern interface using `backdrop-filter` for a premium, translucent feel across navigation, cart, and AI components.
- **Digital Concierge**: An AI-powered fashion assistant widget with simulated typing indicators and sophisticated style advice logic.
- **Shopping Cart**: Fully functional slide-out cart drawer with real-time price calculation and `localStorage` persistence.
- **Multi-Page Architecture**: Dedicated pages for Boutique (Home), Heritage (Brand Story), and Contact (Bespoke Inquiries).
- **Responsive Design**: Optimized for pixel-perfect viewing on both desktop and mobile devices.

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn (ASGI)
- **Language**: Python 3.11+
- **Validation**: Pydantic

### Frontend
- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Design System)
- **Logic**: ES6+ JavaScript (Vanilla)
- **Interactivity**: HTML5 Canvas & SVG Filters

### DevOps & Infrastructure
- **Containerization**: Docker
- **Cloud Platform**: Google Cloud Run
- **CI/CD**: Google Cloud Build / Artifact Registry
- **Base Image**: `python:3.11-slim`

## 📂 Project Structure

```text
The-Atelier/
├── backend/             # FastAPI application & API routes
│   └── main.py          # Core application logic
├── frontend/            # Frontend assets & templates
│   ├── static/          # CSS, JS, and Asset files
│   ├── index.html       # Boutique Home Page
│   ├── about.html       # Heritage Page
│   └── contact.html     # Contact Page
├── Dockerfile           # Production container configuration
├── .dockerignore       # Docker build exclusion rules
├── requirements.txt     # Python dependencies
└── README.md           # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.11+
- Docker (optional, for containerized development)
- Google Cloud SDK (for deployment)

### Local Development Setup

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

4. **Run the FastAPI server**:
   ```bash
   uvicorn backend.main:app --reload
   ```
   Visit `http://localhost:8000` to see the site.

### Docker Deployment (Local)

1. **Build the Docker Image**:
   ```bash
   docker build -t atelier-app .
   ```

2. **Run the Container**:
   ```bash
   docker run -p 8080:8080 atelier-app
   ```
   The application will be available at `http://localhost:8080`.

## ☁️ Cloud Run Deployment

The application is optimized for Google Cloud Run with automatic port detection.

1. **Build and Submit to Artifact Registry**:
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/atelier-app
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy atelier-app --image gcr.io/[PROJECT_ID]/atelier-app --platform managed --allow-unauthenticated
   ```

## 📑 API Documentation

FastAPI automatically generates interactive API documentation for testing endpoints:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## ⚙️ Configuration

The application utilizes environment variables for flexible configuration:

- `PORT`: Server port (defaults to `8080`, automatically set by Cloud Run)
- `HOST`: Set to `0.0.0.0` to listen on all network interfaces

## 🛠️ Development Guidelines

- **Backend**: Place all API logic and routes in the `backend/` directory.
- **Frontend**: Keep assets organized within `frontend/static/` and HTML templates in `frontend/`.
- **Dependencies**: Update `requirements.txt` whenever new packages are added.
- **Optimization**: The `Dockerfile` uses `python:3.11-slim` and `--no-cache-dir` to ensure minimal image size and fast deployment.

## 🤝 Support

For inquiries, bug reports, or contributions, please visit the [GitHub Repository](https://github.com/sagnikbose-11-01/GFG-WorkShop-AtelierApp).

## 📄 License

This project is currently under a proprietary license. Contact the repository owner for licensing details.
