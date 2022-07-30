## Description

The project is written using NestJS - NodeJS framework.

Nodemailer and Google OAuth2 were used to manage email sending.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

Build the project

```bash
docker build -t bitcoin-exchange-rate -f .\Dockerfile .
```

Run the project on a port 81

```bash
docker run --name bitcoin-exchange-rate -d -p 81:3000 bitcoin-rate
```
