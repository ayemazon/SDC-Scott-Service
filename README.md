
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
- Creates record in database table of choice
- Provide request body with a table name and data to insert e.g. `{ table: 'your_table_name', data: { col_1: 'someValue' } }`

**`PUT`** path **`/`**
- Updates record in database table of choice
- Provide request body with a table name, data to update, and id e.g. `{ table: 'your_table_name', data: { col_1: 'someValue' }, id: 45 }`

**`DELETE`** path **`/`**
- Deletes record in database table of choice
- Provide request body with a table name and id e.g. `{ table: 'your_table_name', id: 86 }`
```







