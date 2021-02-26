# Description
Nestjs Startup project. Use this project as base to others

## Features
- NodeJs backend written in Typescript
- Using modular and dependency injection architecture of <a href="http://nodejs.com" target="blank">Nestjs</a> 
- Swagger documentation
- Postgres
- Postgres data base migration
- TypeOrm
- Unity tests
- End to end tests
- Docker componentization
- Error handling
- Log4js integration

### Run using Docker
```bash
$ docker-compose up --build
``` 

### Run locally using Npm
```bash
$ npm install 
$ npm start
```

### Run tests using Npm
```bash
$ npm install
$ npm test
``` 
make sure you have a mongodb running on localhost:27017

### Run end to end tests using Npm
```bash
$ npm install
$ npm run test:e2e
``` 

### Usage
After running the app you can access the documentation at: http://localhost:3000/api
