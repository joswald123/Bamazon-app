DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)

);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Scooter", "Electronics", 150.20, 3),
("Sneakers", "Shoes", 100.00, 20),
("Floor Lamp", "Home", 150.20, 3),
("Home Theater", "Technology", 580.20, 10),
("Tv", "Technology", 399.99, 20),
("Beach Bag", "Accessories", 14.99, 50),
("Top", "Clothing", 8.00, 100),
("Jean Short", "Clothing", 19.99, 50),
("Plastic Folder", "Oficce", 0.59, 55),
("Nintendo Switch", "Games", 299.99, 15);


SELECT * FROM products;     

