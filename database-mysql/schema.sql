DROP DATABASE IF EXISTS amazonpricing;

CREATE DATABASE amazonpricing;

USE amazonpricing;


CREATE TABLE item (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE vendor (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  amz_holds_stock BOOLEAN,
  free_returns BOOLEAN,
  ships_on_saturday BOOLEAN,
  ships_on_sunday BOOLEAN,
  ships_from_zipcode  VARCHAR(10),
  status ENUM('Active', 'Pending Approval', 'Discontinued') NOT NULL
);

CREATE TABLE items_vendors (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  item_id INT NOT NULL,
  vendor_id INT NOT NULL,
  items_condition VARCHAR(17),
  price DECIMAL NOT NULL,
  quantity_available SMALLINT NOT NULL,
  amz_holds_stock BOOLEAN,
	free_returns BOOLEAN,
  ships_from_zipcode	VARCHAR(10),
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (vendor_id) REFERENCES vendor(id)
);

LOAD DATA LOCAL INFILE 'database-mysql/fake-data/items.txt'
  INTO TABLE item
  (name);

LOAD DATA LOCAL INFILE 'database-mysql/fake-data/vendors.txt'
  INTO TABLE vendor
  (name, amz_holds_stock, free_returns, ships_on_saturday, ships_on_sunday, ships_from_zipcode, status);

LOAD DATA LOCAL INFILE 'database-mysql/fake-data/items_vendors.txt'
  INTO TABLE items_vendors
  (item_id, vendor_id, items_condition, price, quantity_available, amz_holds_stock, free_returns, ships_from_zipcode);

SHOW WARNINGS;