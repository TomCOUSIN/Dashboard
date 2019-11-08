CREATE TABLE public.users
(
  id SERIAL PRIMARY KEY NOT NULL,
  username text NOT NULL,
  code text NOT NULL
);

CREATE TABLE public.services
(
  id SERIAL PRIMARY KEY NOT NULL,
  url text NOT NULL,
  name text NOT NULL
);

CREATE TABLE public.widgets
(
  id SERIAL PRIMARY KEY NOT NULL,
  url text NOT NULL,
  name text NOT NULL,
  params text[]
);
