import mysql.connector
from mysql.connector import pooling
from .config import settings

_pool = pooling.MySQLConnectionPool(
    pool_name="aiwaiter_pool",
    pool_size=10,
    host=settings.db_host,
    port=settings.db_port,
    user=settings.db_user,
    password=settings.db_password,
    database=settings.db_name,
    charset="utf8mb4",
    autocommit=False,
)


def get_connection():
    """Get a raw connection (for startup tasks)."""
    return _pool.get_connection()


def get_db():
    """FastAPI dependency — yields a connection, closes on exit."""
    conn = _pool.get_connection()
    try:
        yield conn
    finally:
        conn.close()
