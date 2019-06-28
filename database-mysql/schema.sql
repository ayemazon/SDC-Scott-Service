DROP DATABASE IF EXISTS amazonpricing;

CREATE DATABASE amazonpricing;

USE amazonpricing;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  default_address_zip INT(5),
  PRIMARY KEY (id)
);



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
  ships_from_zipcode  INT(5),
  status ENUM('Active', 'Pending Approval', 'Discontinued') NOT NULL
);

CREATE TABLE item_availability (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  item_id INT NOT NULL,
  vendor_id INT NOT NULL,
  items_condition VARCHAR(255),
  price DECIMAL NOT NULL,
  quantity_available INT NOT NULL,
  amz_holds_stock BOOLEAN,
	free_returns BOOLEAN,
  ship_from_zipcode	INT(5),
  CONSTRAINT fk_item FOREIGN KEY fk_item(item_id) REFERENCES item(id),
  CONSTRAINT fk_vendor FOREIGN KEY fk_vendor(vendor_id) REFERENCES vendor(id)
);
