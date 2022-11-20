-- CREATE DATABASE;
CREATE TABLE tb_collect(
  _id SERIAL PRIMARY KEY,
  collect_type varchar(255),
  associate_initial varchar(255),
  postal_code varchar(255),
  first_time_visitor int,
  repeat_visitor int,
  individual_num_adult int,
  individual_num_college int,
  individual_num_senior int,
  individual_num_teen int,
  individual_num_youth int,
  moca_email varchar(255),
  moca_member varchar(255),
  institution varchar(255),
  outside_us varchar(255),
  created_at date,
  updated_at date
);
