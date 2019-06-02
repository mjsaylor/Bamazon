-- The products table should have each of the following columns:
-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Settlers of Catan", "Toys & Games", 35.00, 30),
("Agricola", "Toys & Games", 48.00, 22),
("Azul", "Toys & Games", 30.95, 40),
("Sleeper Sofa", "Furniture", 1000.00, 3), 
("Nintendo Switch", "Electronics", 210.00, 24),
("Food Processor", "Kitchen", 35.00, 15),
("Yarn", "Arts & Crafts", 5.00, 60),
("Captain Marvel BluRay", "Electronics", 29.99, 70),
("Lawn Gnome", "Home Decor", 16.00, 20),
("Wingspan", "Toys & Games", 135.00, 2);
