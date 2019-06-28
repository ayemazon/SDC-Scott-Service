const faker = require("faker");
//faker.setLocale("en_US");

faker.seed(123);

var User = function () {
  var name = faker.name.findName();
  var email = faker.internet.email();
  var default_address_zip = faker.address.zipCode('#####');

  return {
    name: name,
    email: email,
    default_address_zip: default_address_zip
  };

};

var Item = function () {
  var name = faker.commerce.productName();
  return {
    name: name
  };
};

var Vendor = function () {
  let name = faker.name.findName();
  let amz_holds_stock = faker.random.number(1);
  let free_returns = faker.random.number(1);
  let ships_on_saturday = faker.random.number(1);
  let ships_on_sunday = faker.random.number(1);
  let ships_from_zipcode = faker.address.zipCode('#####');
  let status = faker.random.arrayElement(["Active", "Pending Approval", "Discontinued"]);

  return {
    name: name,
    amz_holds_stock: amz_holds_stock,
    free_returns: free_returns,
    ships_on_saturday: ships_on_saturday,
    ships_on_sunday: ships_on_sunday,
    ships_from_zipcode: ships_from_zipcode,
    status: status
  };
};

var ItemAvailability = function () {
  let item_id = faker.random.number(20);
  let vendor_id = faker.random.number(20);
  let items_condition = faker.commerce.productMaterial();
  let price = faker.commerce.price();
  let quantity_available = faker.random.number(1000);
  let amz_holds_stock = faker.random.number(1);
  let free_returns = faker.random.number(1);
  let ship_from_zipcode = faker.address.zipCode('#####')

  return {
    item_id: item_id,
    vendor_id: vendor_id,
    items_condition: items_condition,
    price: price,
    quantity_available: quantity_available,
    amz_holds_stock: amz_holds_stock,
    free_returns: free_returns,
    ship_from_zipcode: ship_from_zipcode
  }
};

module.exports = {
  User: User,
  Item: Item,
  Vendor: Vendor,
  ItemAvailability: ItemAvailability
};