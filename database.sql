-- CREATE DATABASE perntodo;

CREATE TABLE tb_individual(
  _id SERIAL PRIMARY KEY,
  associate_initial text,
  first_time_visitor int,
  individual_num_adult int,
  individual_num_college int,
  individual_num_senior int,
  individual_num_teen int,
  individual_num_youth int,
  moca_email text,
  moca_member text,
  outside_us text,
  postal_code text,
  repeat_visitor int,
  created_at text,
  updated_at text
);

CREATE TABLE tb_group(
  _id SERIAL PRIMARY KEY,
  associate_initial text,
  individual_num_adult int,
  individual_num_college int,
  individual_num_senior int,
  individual_num_teen int,
  individual_num_youth int,
  institution text,
  outside_us text,
  postal_code text,
  created_at text,
  updated_at text
);
