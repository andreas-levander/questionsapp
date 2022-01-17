#Questions application

##What it is:
This is an application built using deno where you can add questions and take a quiz containing random questions from all questions in the database.

Web page: https://aaltowebcourse2.herokuapp.com/

##How to run locally:
1. add database credentials to "database/database.js" connection pool
2. add the database tables to your database
3. run command "deno run --allow-all --unstable run-locally.js"
4. go to "localhost:7777" in your browser to see the application

##To have tests working as they should you need to:
1. have database with table
2. added a question and options
3. answered a question

##Database Tables:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));
