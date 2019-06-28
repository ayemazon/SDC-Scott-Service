# Project Name

> Project description

## Related Projects

  - https://github.com/the-purple-team/bruce-service
  - https://github.com/the-purple-team/bradyService
  - https://github.com/the-purple-team/Jose-Questions-And-Answers-Service
  - https://github.com/teamName/repo
  TODO

## Table of Contents

1. [Assumptions] (#Assumptions)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Assumptions

-- all Users are located in US

## Usage



## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

#### MYSQL

*Install*
```sh
brew install mysql@5.7
```

*Connect*
```
mysql -u root -p
```


### Local
*setup.js*
- Copy temp_setup.js to setup.js
- Update environment information in setup.js file

*Database*
- Make sure your mysql server is running locally

- create database
```
mysql -u root -p
source ./database-mysql/schema.sql
```

- seed database
  - from command prompt (not sql)
```console
node ./database-mysql/seeds/loadFakeData.js
```


*Steps*
Install dependencies
```console
npm install
```

Compile react app for Production
```
npm run react-prod
```




### AWS

