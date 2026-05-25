from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_host: str = "localhost"
    db_port: int = 3306
    db_user: str
    db_password: str
    db_name: str
    secret_key: str
    google_client_id: str
    upload_dir: str = "uploads"
    access_token_expire_minutes: int = 10080
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"


settings = Settings()
