CREATE TABLE mentors
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    in_glasgow VARCHAR(20) NOT NULL,
    address VARCHAR(240) NOT NULL,
    fav_lang VARCHAR(60) NOT NULL
);

CREATE TABLE students
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    address VARCHAR(240) NOT NULL,
    graduate BOOLEAN
);

CREATE TABLE classes
(
    id SERIAL PRIMARY KEY,
    mentor_id INT REFERENCES mentors(id),
    topic VARCHAR(40) NOT NULL,
    date DATE NOT NULL
)

INSERT INTO mentors
    (name, in_glasgow, address, fav_lang)
VALUES
    ('Andy', '5 years', '1/4 656 Long Street, G65 7FG Glasgow', 'JS');

INSERT INTO mentors
    (name, in_glasgow, address, fav_lang)
VALUES
    ('Steve', '12 years', '2 6 Long Street, G65 7FG Glasgow', 'Python');

INSERT INTO mentors
    (name, in_glasgow, address, fav_lang)
VALUES
    ('Kate', '9 months', '3 112 Fun Street, G63 4FG Glasgow', 'C++');

INSERT INTO mentors
    (name, in_glasgow, address, fav_lang)
VALUES
    ('Ann', '18 months', '2/4 65 Fun Street, G63 4FG Glasgow', 'JS');

INSERT INTO students
    (name, address, graduate)
VALUES
    ('A', '1 street', TRUE);

INSERT INTO students
    (name, address, graduate)
VALUES
    ('B', '2 street', FALSE);

INSERT INTO students
    (name, address, graduate)
VALUES
    ('C', '3 street', TRUE);

INSERT INTO students
    (name, address, graduate)
VALUES
    ('D', '1/1 street', TRUE);

INSERT INTO students
    (name, address, graduate)
VALUES
    ('F', '1/3 street', FALSE);

INSERT INTO students
    (name, address, graduate)
VALUES
    ('AB', '12/1 street', FALSE);

SELECT *
FROM mentors;

SELECT *
FROM students;