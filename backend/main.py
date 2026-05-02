from fastapi import FastAPI, APIRouter
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import asyncio
import os

app = FastAPI(title="Maison De Prestige Backend")
api_router = APIRouter()

# --- Models ---
class ChatMessage(BaseModel):
    message: str

# --- API Endpoints ---

@api_router.get("/products")
async def get_products():
    """
    Returns the curated collection of luxury items.
    Updated with high-resolution, reliable Unsplash sources.
    """
    return [
        {
            "id": 1,
            "name": "Tailored Wool Blazer",
            "price": 1450,
            "image": "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&q=80&w=800",
            "description": "Precisely tailored wool blazer with structured shoulders and a slim fit."
        },
        {
            "id": 2,
            "name": "Cashmere Overcoat",
            "price": 2400,
            "image": "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800",
            "description": "Double-breasted pure Mongolian cashmere coat in camel."
        },
        {
            "id": 3,
            "name": "Tailored Trousers",
            "price": 650,
            "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
            "description": "Impeccably tailored virgin wool trousers for a sharp silhouette."
        },
        {
            "id": 4,
            "name": "Leather Tote",
            "price": 1200,
            "image": "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800",
            "description": "Handcrafted full-grain calfskin leather tote bag."
        },
        {
            "id": 5,
            "name": "Suede Loafers",
            "price": 750,
            "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800",
            "description": "Classic Italian suede loafers with hand-stitched detailing."
        },
        {
            "id": 6,
            "name": "Merino Knit Sweater",
            "price": 550,
            "image": "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
            "description": "Ultra-soft fine merino wool knit in a timeless cream hue."
        }
    ]

@api_router.post("/chat")
async def chat_with_concierge(chat: ChatMessage):
    """
    Simulated 'Digital Concierge' AI Agent.
    Includes a 1.5s delay to mimic 'thinking' for a premium feel.
    """
    msg = chat.message.lower()
    await asyncio.sleep(1.5) 
    
    if any(word in msg for word in ["cashmere", "coat", "winter", "warm"]):
        response = "Our cashmere is sourced from the high plateaus of Mongolia and finished in Italy. It offers unparalleled warmth and softness for the season."
    elif any(word in msg for word in ["silk", "blouse", "shirt"]):
        response = "The silk pieces are crafted from 22-momme Mulberry silk, providing a lustrous finish and a beautiful, fluid drape."
    elif any(word in msg for word in ["shipping", "delivery", "receive"]):
        response = "We offer complimentary white-glove delivery on all orders. Your selections will arrive in our signature sustainable packaging within 3-5 business days."
    elif any(word in msg for word in ["hello", "hi", "greetings"]):
        response = "Welcome to The Atelier. How may I assist you with your bespoke wardrobe selections today?"
    else:
        response = "An excellent inquiry. Every piece in our collection is designed with timeless elegance and longevity in mind. Would you like to explore our latest arrivals?"
        
    return {"reply": response}

# --- Mounting and Routing ---

# Include the API router
app.include_router(api_router, prefix="/api")

# Serve static files (CSS, JS, Images) from the frontend/static folder
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join("frontend", "index.html"))

@app.get("/about")
async def serve_about():
    return FileResponse(os.path.join("frontend", "about.html"))

@app.get("/contact")
async def serve_contact():
    return FileResponse(os.path.join("frontend", "contact.html"))

if __name__ == "__main__":
    import uvicorn
    import os
    # Cloud Run provides the PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)