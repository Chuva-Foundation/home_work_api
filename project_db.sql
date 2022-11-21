CREATE DATABASE chuva_academy;

CREATE TYPE GENDER_TYPE AS ENUM ('male', 'female', 'other');
CREATE TYPE USER_TYPE AS ENUM ('student', 'teacher');

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(30) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(255),
    gender GENDER_TYPE,
    user_tp USER_TYPE
);


CREATE TABLE programming_languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
)

INSERT INTO programming_languages (name) VALUES ('C');
INSERT INTO programming_languages (name) VALUES ('JavaScript');
INSERT INTO programming_languages (name) VALUES ('Python');
INSERT INTO programming_languages (name) VALUES ('Java');
INSERT INTO programming_languages (name) VALUES ('C#');
INSERT INTO programming_languages (name) VALUES ('C++');
INSERT INTO programming_languages (name) VALUES ('Scracth');


CREATE TABLE problems_sets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    description TEXT NOT NULL,
    pgrm_lang_id INTEGER,
    deadline DATE,
    points REAL,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
    FOREIGN KEY(pgrm_lang_id) REFERENCES programming_languages(id)
);


CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    pset_id INTEGER,
    user_id INTEGER,
    user_points REAL NULL,
    dir_path TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(pset_id) REFERENCES problems_sets(id) 
);
