from pydantic import BaseModel, EmailStr
from typing import Optional


# ── Auth ─────────────────────────────────────────────────────────────────────

class GoogleAuthRequest(BaseModel):
    credential: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ── Response models ───────────────────────────────────────────────────────────

class RestaurantOut(BaseModel):
    id: int
    name: str
    type: str
    logo_url: Optional[str]
    location_state: str
    location_city: str
    is_chain: bool

class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    avatar_url: Optional[str]
    is_onboarded: bool
    restaurant: Optional[RestaurantOut] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
