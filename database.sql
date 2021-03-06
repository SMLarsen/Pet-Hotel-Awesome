CREATE TABLE owners(
 id serial PRIMARY KEY,
 first_name VARCHAR(40) NOT NULL,
 last_name VARCHAR (40) NOT NULL);
 
CREATE TABLE pets(
id serial PRIMARY KEY,
name VARCHAR(30) NOT NULL,
breed VARCHAR(30) NOT NULL,
color VARCHAR(20) NOT NULL,
owners_id int REFERENCES owners(id)
);

CREATE TABLE visits(
id serial PRIMARY KEY,
check_in_date DATE NOT NULL,
check_out_date DATE,
pets_id int REFERENCES pets(id)
);

