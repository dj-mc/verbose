CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    contact_id VARCHAR NOT NULL UNIQUE
);
