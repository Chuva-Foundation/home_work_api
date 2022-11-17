CREATE DATABASE chuva_academy;

CREATE TABLE genders(
    id SERIAL PRIMARY KEY,
    gender VARCHAR(11)
);
INSERT INTO genders (gender) VALUES('male');
INSERT INTO genders (gender) VALUES('female');
INSERT INTO genders (gender) VALUES('not defined');

CREATE TABLE user_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(7)
);
INSERT INTO user_types (name) VALUES('student');
INSERT INTO user_types (name) VALUES('teacher');


CREATE TABLE people(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    birth DATE,
    gender_id INTEGER,
    FOREIGN KEY(gender_id) REFERENCES gneders(id)
);

CREATE TABLE users (
    id SERIAL,
    user_name VARCHAR(30),
    email VARCHAR(255),
    password VARCHAR(255),
    user_type_id INTEGER,
    person_id INTEGER,
    FOREIGN KEY(user_type_id) REFERENCES user_types(id),
    FOREIGN KEY(person_id) REFERENCES people(id)
    
);

CREATE TABLE problem_sets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    description TEXT NOT NULL,
    deadline DATE,
    points REAL
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    pset_id INTEGER,
    user_id INTEGER,
    user_points REAL,
    dir_path TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(pset_id) REFERENCES problem_sets(id) 
);

CREATE TABLE teacher_students (
    id SERIAL,
    teacher_id INTEGER,
    student_id INTEGER,
    FOREIGN KEY(teacher_id, student_id) REFERENCES users(id, id)
);