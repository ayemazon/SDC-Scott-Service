DROP DATABASE IF EXISTS amazonpricing;

CREATE DATABASE amazonpricing;

USE amazonpricing;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  default_address_zip INT(5),
  -- defaultAddressId INT(3),
  -- hasLists BOOLEAN default 0,
  -- defaultListId INT(3),
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
  -- shipFromAddress
  ships_from_zipcode  INT(5),
  status ENUM('Active', 'Pending Approval', 'Discontinued') NOT NULL
);

CREATE TABLE item_availability (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  item_id INT NOT NULL,
  vendor_id INT NOT NULL,
  items_condition VARCHAR(255),
  -- item_condition_notes VARCHAR(255),
  price DECIMAL NOT NULL,
  quantity_available INT NOT NULL,
  amz_holds_stock BOOLEAN,
	free_returns BOOLEAN,
  ship_from_zipcode	INT(5),
  -- Customizable
  -- Protection Plan Offered
  -- Accessories
  -- Gift Wrap Options
  FOREIGN KEY fk_item(item_id) REFERENCES item(item_id),
  FOREIGN KEY fk_vendor(vendor_id) REFERENCES vendor(vendor_id)
);

CREATE TABLE ups_shipment (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  from_city VARCHAR(255),
  from_state VARCHAR(2),
  to_city VARCHAR(255),
  to_state VARCHAR(2),
  shipment_type	ENUM('1 Day', '2 Day', 'Standard') NOT NULL,
  expected_num_of_days INT
);




/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be
 *    mysql -u root < schema.sql
 *
 *  If you need assistance with this step,
 *  please talk to a proctor.
*/

-- INSERT INTo phrases (kor, rom, eng) VALUES ("안녕하새요", "an-nyeong ha-se-yo", "Hello");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("감사합니다", "gam-sa-hab-ni-da", "Thank you");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("잠시만요", "jam-si-man-yo", "Wait a moment/Excuse me");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("미안해요", "mi-an-he-yo", "I'm sorry.");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("이거 얼마예요?", "i-geo eol-ma-ye-yo", "How much does this cost?");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("공핳 가주새요", "gong-hang ga-ju-se-yo", "Please take me to the airport.");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("잘 먹겠습니다", "jal meok-ge-sseum-ni-da", "I will eat well!");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("김밥 주세요", "gim-bap ju-se-yo", "Please give me Kimbap.");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("맛있어요", "ma-si-sseo-yo", "It's delicious!");
-- INSERT INTo phrases (kor, rom, eng) VALUES ("헤크리엑터 대박이예요!", "Hack Reactor dae-bak-i-ye-yo", "Hack Reactor is amazing!");
-- CREATE TABLE address (
--   id INT NOT NULL AUTO_INCREMENT,
--   addressLine1 VARCHAR(255) NOT NULL,
--   addressLine2 VARCHAR(255) NOT NULL,
--   addressCity VARCHAR(255) NOT NULL,
--   addressState VARCHAR(2) NOT NULL,
--   addressZipcode INT(5),
--   PRIMARY KEY (id)
-- );