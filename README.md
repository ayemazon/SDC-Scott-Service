
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

##API Usage







