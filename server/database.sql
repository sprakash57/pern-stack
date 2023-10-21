CREATE DATABASE jwtauth;

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    PRIMARY_KEY(email)
);

INSERT INTO users(email, user_password, created_at) VALUES ('john@doe.com', '123qwe', '2016-06-22 19:10:25-07');
