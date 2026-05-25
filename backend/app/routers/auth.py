from fastapi import APIRouter, Depends, HTTPException
from ..database import get_db
from .. import schemas
from ..auth import (
    verify_google_token, hash_password, verify_password,
    create_access_token, get_current_user,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def _fetch_user_with_restaurant(conn, user_id: int) -> dict:
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """
        SELECT u.id, u.email, u.full_name, u.avatar_url, u.is_onboarded,
               r.id AS r_id, r.name AS r_name, r.type AS r_type,
               r.logo_url, r.location_state, r.location_city, r.is_chain
        FROM users u
        LEFT JOIN restaurants r ON r.user_id = u.id
        WHERE u.id = %s
        """,
        (user_id,),
    )
    row = cursor.fetchone()
    cursor.close()

    if not row:
        return None

    user = {
        "id": row["id"],
        "email": row["email"],
        "full_name": row["full_name"],
        "avatar_url": row["avatar_url"],
        "is_onboarded": bool(row["is_onboarded"]),
        "restaurant": None,
    }
    if row["r_id"]:
        user["restaurant"] = {
            "id": row["r_id"],
            "name": row["r_name"],
            "type": row["r_type"],
            "logo_url": row["logo_url"],
            "location_state": row["location_state"],
            "location_city": row["location_city"],
            "is_chain": bool(row["is_chain"]),
        }
    return user


def _token_response(conn, user_id: int) -> dict:
    return {
        "access_token": create_access_token(user_id),
        "user": _fetch_user_with_restaurant(conn, user_id),
    }


@router.post("/google", response_model=schemas.TokenResponse)
def google_auth(body: schemas.GoogleAuthRequest, conn=Depends(get_db)):
    info = verify_google_token(body.credential)
    google_id, email = info["sub"], info["email"]

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id FROM users WHERE google_id = %s", (google_id,))
    row = cursor.fetchone()

    if row:
        user_id = row["id"]
    else:
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        existing = cursor.fetchone()
        if existing:
            cursor.execute(
                "UPDATE users SET google_id = %s, avatar_url = COALESCE(avatar_url, %s) WHERE id = %s",
                (google_id, info.get("picture"), existing["id"]),
            )
            user_id = existing["id"]
        else:
            cursor.execute(
                "INSERT INTO users (google_id, email, full_name, avatar_url) VALUES (%s, %s, %s, %s)",
                (google_id, email, info.get("name"), info.get("picture")),
            )
            user_id = cursor.lastrowid
        conn.commit()

    cursor.close()
    return _token_response(conn, user_id)


@router.post("/register", response_model=schemas.TokenResponse)
def register(body: schemas.RegisterRequest, conn=Depends(get_db)):
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id FROM users WHERE email = %s", (body.email,))
    if cursor.fetchone():
        cursor.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    cursor.execute(
        "INSERT INTO users (email, full_name, hashed_password) VALUES (%s, %s, %s)",
        (body.email, body.full_name, hash_password(body.password)),
    )
    user_id = cursor.lastrowid
    conn.commit()
    cursor.close()
    return _token_response(conn, user_id)


@router.post("/login", response_model=schemas.TokenResponse)
def login(body: schemas.LoginRequest, conn=Depends(get_db)):
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, hashed_password FROM users WHERE email = %s", (body.email,))
    row = cursor.fetchone()
    cursor.close()

    if not row or not row["hashed_password"] or not verify_password(body.password, row["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return _token_response(conn, row["id"])


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: dict = Depends(get_current_user), conn=Depends(get_db)):
    return _fetch_user_with_restaurant(conn, current_user["id"])
