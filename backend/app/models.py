VALID_RESTAURANT_TYPES = {
    "fast_food", "casual_dining", "fine_dining", "cafe",
    "bakery", "dhaba", "cloud_kitchen", "bar_grill", "buffet", "street_food",
}

_USERS = """
CREATE TABLE IF NOT EXISTS users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    google_id       VARCHAR(255) UNIQUE NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    full_name       VARCHAR(255) NULL,
    hashed_password VARCHAR(255) NULL,
    avatar_url      VARCHAR(500) NULL,
    is_onboarded    TINYINT(1) NOT NULL DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
"""

_RESTAURANTS = """
CREATE TABLE IF NOT EXISTS restaurants (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    type            VARCHAR(50) NOT NULL,
    logo_url        VARCHAR(500) NULL,
    location_state  VARCHAR(100) NOT NULL,
    location_city   VARCHAR(100) NOT NULL,
    is_chain        TINYINT(1) NOT NULL DEFAULT 0,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
"""

_MENUS = """
CREATE TABLE IF NOT EXISTS menus (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id     INT NOT NULL,
    file_url          VARCHAR(500) NOT NULL,
    file_type         VARCHAR(10) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    uploaded_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
"""


def init_db(conn):
    cursor = conn.cursor()
    cursor.execute(_USERS)
    cursor.execute(_RESTAURANTS)
    cursor.execute(_MENUS)
    conn.commit()
    cursor.close()
