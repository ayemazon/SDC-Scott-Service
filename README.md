
## Table of Contents

1. [Environment Setup Local](#Environment)
2. [API Usage](#API)

## Environment Setup Local

*Install MySQL*
```console
brew install mysql@5.7
```

*Install dependencies*
```console
npm install
```

*Run MySQL from command line*
```console
mysql -u root -p
```

*Create Database*
```
source ./database-mysql/schema.sql
```

*Create setup.js*
- Copy temp_setup.js to setup.js
- Update environment information in setup.js file


*Seed database*
```console
node ./database-mysql/seeds/loadFakeData.js
```

*Compile react app for Production*
```
npm run react-prod
```

*Run server*
```
npm run server
```

## API Use

**`GET`** path **`/product/:id`**
- Fetches product info for the given id, including product availability

**`POST`** path **`/`**
- Creates record in database collection "items" ONLY
- Provide request body with the collection name and product/item name e.g. `{"collection":"items","data":{"name":"Brand-new newness"}}`

## MongoDB data generation scripts

Use file **`database-mongo/make-fake-data.js`**
- Notes contained therein for data generation and seeding

**After database is seeded:**
- You will need to add an index to the **`item_id field`** of **`items_vendors`** collection. From the mongo shell, this looks like **`db.collection.createIndex(keys, options)`** as per mongo's documentation. Since this field is used for the service's main query, running queries without an index on the **`item_id`** field will result in very slow document retrieval.






