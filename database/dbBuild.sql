BEGIN;

DROP TABLE IF EXISTS users, codebase CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE codebase (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  code VARCHAR(500) NOT NULL
);

INSERT INTO users (username, email, password) VALUES
('Akin909', 'akinzo@bobz.com', 'stufffffff');


INSERT INTO codebase (user_id, code) VALUES
('1','() => fn => next => fn(next)'),
('1','function(name){
    console.log("Hello World")
  }');

COMMIT;
