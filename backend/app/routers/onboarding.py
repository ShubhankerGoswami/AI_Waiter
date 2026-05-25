import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import Optional
from ..database import get_db
from ..auth import get_current_user
from ..config import settings
from ..models import VALID_RESTAURANT_TYPES

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

ALLOWED_LOGO_TYPES = {"image/jpeg", "image/jpg", "image/png"}
ALLOWED_MENU_TYPES = {"image/jpeg", "image/jpg", "image/png", "application/pdf"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def _save_file(file: UploadFile, folder: str) -> str:
    dest = os.path.join(settings.upload_dir, folder)
    os.makedirs(dest, exist_ok=True)
    ext = file.filename.rsplit(".", 1)[-1].lower()
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(dest, filename)
    content = file.file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10 MB.")
    with open(path, "wb") as f:
        f.write(content)
    return f"/{settings.upload_dir}/{folder}/{filename}"


@router.post("/step1")
async def step1(
    restaurant_name: str = Form(...),
    restaurant_type: str = Form(...),
    location_state: str = Form(...),
    location_city: str = Form(...),
    is_chain: bool = Form(...),
    logo: Optional[UploadFile] = File(None),
    conn=Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    if restaurant_type not in VALID_RESTAURANT_TYPES:
        raise HTTPException(status_code=400, detail="Invalid restaurant type")

    logo_url = None
    if logo and logo.filename:
        if logo.content_type not in ALLOWED_LOGO_TYPES:
            raise HTTPException(status_code=400, detail="Logo must be a JPG or PNG image")
        logo_url = _save_file(logo, "logos")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id FROM restaurants WHERE user_id = %s", (current_user["id"],))
    existing = cursor.fetchone()

    if existing:
        if logo_url:
            cursor.execute(
                """UPDATE restaurants
                   SET name=%s, type=%s, location_state=%s, location_city=%s,
                       is_chain=%s, logo_url=%s
                   WHERE user_id=%s""",
                (restaurant_name, restaurant_type, location_state, location_city,
                 int(is_chain), logo_url, current_user["id"]),
            )
        else:
            cursor.execute(
                """UPDATE restaurants
                   SET name=%s, type=%s, location_state=%s, location_city=%s, is_chain=%s
                   WHERE user_id=%s""",
                (restaurant_name, restaurant_type, location_state, location_city,
                 int(is_chain), current_user["id"]),
            )
    else:
        cursor.execute(
            """INSERT INTO restaurants
               (user_id, name, type, logo_url, location_state, location_city, is_chain)
               VALUES (%s, %s, %s, %s, %s, %s, %s)""",
            (current_user["id"], restaurant_name, restaurant_type, logo_url,
             location_state, location_city, int(is_chain)),
        )

    conn.commit()

    cursor.execute("SELECT * FROM restaurants WHERE user_id = %s", (current_user["id"],))
    restaurant = cursor.fetchone()
    restaurant["is_chain"] = bool(restaurant["is_chain"])
    cursor.close()

    return {"message": "Step 1 saved", "restaurant": restaurant}


@router.post("/step2")
async def step2(
    menu: Optional[UploadFile] = File(None),
    conn=Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id FROM restaurants WHERE user_id = %s", (current_user["id"],))
    restaurant = cursor.fetchone()

    if not restaurant:
        cursor.close()
        raise HTTPException(status_code=400, detail="Complete step 1 first")

    if menu and menu.filename:
        if menu.content_type not in ALLOWED_MENU_TYPES:
            cursor.close()
            raise HTTPException(status_code=400, detail="Menu must be JPG, PNG, or PDF")
        file_url = _save_file(menu, "menus")
        ext = menu.filename.rsplit(".", 1)[-1].lower()
        cursor.execute(
            """INSERT INTO menus (restaurant_id, file_url, file_type, original_filename)
               VALUES (%s, %s, %s, %s)""",
            (restaurant["id"], file_url, ext, menu.filename),
        )
        conn.commit()

    cursor.close()
    return {"message": "Step 2 saved"}


@router.post("/complete")
def complete_onboarding(
    conn=Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id FROM restaurants WHERE user_id = %s", (current_user["id"],))
    restaurant = cursor.fetchone()

    if not restaurant:
        cursor.close()
        raise HTTPException(status_code=400, detail="Complete restaurant details first")

    cursor.execute("UPDATE users SET is_onboarded = 1 WHERE id = %s", (current_user["id"],))
    conn.commit()

    cursor.execute(
        """SELECT u.id, u.email, u.full_name, u.avatar_url,
                  r.id AS r_id, r.name AS r_name, r.type AS r_type,
                  r.logo_url, r.location_state, r.location_city, r.is_chain
           FROM users u
           LEFT JOIN restaurants r ON r.user_id = u.id
           WHERE u.id = %s""",
        (current_user["id"],),
    )
    row = cursor.fetchone()
    cursor.close()

    return {
        "message": "Onboarding complete",
        "user": {
            "id": row["id"],
            "email": row["email"],
            "full_name": row["full_name"],
            "avatar_url": row["avatar_url"],
            "is_onboarded": True,
            "restaurant": {
                "id": row["r_id"],
                "name": row["r_name"],
                "type": row["r_type"],
                "logo_url": row["logo_url"],
                "location_state": row["location_state"],
                "location_city": row["location_city"],
                "is_chain": bool(row["is_chain"]),
            } if row["r_id"] else None,
        },
    }
