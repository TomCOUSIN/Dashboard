CREATE TABLE public.users
(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(100) NOT NULL,
  code VARCHAR(100) NOT NULL
);
INSERT INTO users(username, code) VALUES ('john', '12345'),('frank', '2343214214'),('fred', 'zefezafezaf');