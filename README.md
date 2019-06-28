
## Table of Contents

1. [Environment Setup Local](#Environment)
1. [AWS Setup](#AWS)

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

## AWS - High level Account Setup

### IAM Module

#### Enable Multi-Factor Authentication
- Created Policy
- Added new User
- Created Group
- Assigned User to Group

### VPC Module

TODO

### RDS Module

TODO

- Update the env/setup.js to connect to RDS Database

### EC2 Module

#### Create New Instance
- Mostly standard	/ default selections except
  - VPC and Subnets, as created in previous steps
- Security Group, modify rules
  - SSH - restricted to my IP
  - TCP - Port=3030, Anywhere
- Created Instance
- Setup key-pair locally
- Create Elastic IP
  - Allocate New Address
  - Actions > Associate Address

#### Connect to AWS from Command Line
- Run the following to prevent changes to PEM File
```console
chmod 400 ~/../linkToYourPEMFile.pem
```

- Connect to AWS (default user: ec2-user)
```
ssh -i <pem-file> ec2-user@<ec2-ip>
```

#### Deploy application to EC2
- Run any updates required
```
sudo yum update
```

- Install node
```
curl --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum install -y nodejs
```
Check node was installed

Exit connection to EC2
```
exit
```

- Delete the node-modules folder, so that the upload to ec2 server is faster

- Run the following to push local files to EC2 from local console
```
scp -r -i ../../**.pem ../<folder-name> ec2-user@3.218.88.90:/home/ec2-user/<folder-name>
```

- Change folder to /<folder-name>

- run `npm install`

- Start the application
```
npm run start
```

- Open in browser
<elastic-ip-address>:<port>


### PM2 Module
- to keep the server running

```
sudo npm i -g pm2
```







