create database if not exists home_rental;

use home_rental;

create table users (
    id int not null auto_increment,
    avatar text null,
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    telephone varchar(50) not null,
    email text not null,
    password text not null,
    primary key (id)
);

create table homes (
    id int not null auto_increment,
    photo1 text not null,
    photo2 text not null,
    address varchar(100) not null,
    city varchar(50) not null,
    country varchar(50) not null,
    price float not null,
    bedrooms smallint not null,
    bathrooms smallint not null,
    furnished boolean not null,
    sqrt float not null,
    available boolean not null,
    primary key (id)
);

create table rentals (
    id int not null auto_increment,
    rental_date date not null,
    return_date date not null,
    price float not null,
    user_id int,
    home_id int,
    primary key (id),
    foreign key (user_id) references users(id),
    foreign key (home_id) references homes(id)
);

insert into homes (photo1, photo2, address, city, country, price, bedrooms, bathrooms, available) values 
('https://example.com/home1_photo1.jpg',
'https://example.com/home1_photo2.jpg',
'123 Main St', 'New York', 'USA', 200, 3, 2, 0),

('https://example.com/home2_photo1.jpg',
'https://example.com/home2_photo2.jpg',
'456 Elm St', 'Los Angeles', 'USA', 300, 4, 3, 1),

('https://example.com/home3_photo1.jpg',
'https://example.com/home3_photo2.jpg',
'789 Oak St', 'London', 'UK', 150, 2, 1, 1),

('https://example.com/home4_photo1.jpg',
'https://example.com/home4_photo2.jpg',
'321 Pine St', 'Paris', 'France', 250, 3, 2, 1),

('https://example.com/home5_photo1.jpg',
'https://example.com/home5_photo2.jpg',
'654 Maple St', 'Tokyo', 'Japan', 400, 5, 4, 0),

('https://example.com/home6_photo1.jpg',
'https://example.com/home6_photo2.jpg',
'987 Cedar St', 'Sydney', 'Australia', 350, 4, 3, 1);
