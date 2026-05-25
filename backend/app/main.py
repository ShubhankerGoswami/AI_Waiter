import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routers import auth, onboarding
from .config import settings
from .database import get_connection
from .models import init_db

# Create tables on startup
_conn = get_connection()
init_db(_conn)
_conn.close()

os.makedirs(os.path.join(settings.upload_dir, "logos"), exist_ok=True)
os.makedirs(os.path.join(settings.upload_dir, "menus"), exist_ok=True)

app = FastAPI(title="AIWaiter API", version="1.0.0", docs_url="/api/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

app.include_router(auth.router, prefix="/api")
app.include_router(onboarding.router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "message": "AIWaiter API is running"}
