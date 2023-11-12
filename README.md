# Goomer Lista Rango

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Installation](#installation)

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)

## Project Overview

This project aims to create an API RESTful capable of managing restaurants and its products.

# API DOCUMENTATION

**CONSUMER**

<!-- NO AUTHENTICATION -->

_CONSUMER DATA_

id: string
fistName:string
lastName:string
email:string
password:string
address:string

_CREATE A CONSUMER_

POST REQUEST
localhost:3000/consumer

RETURNS A SINGLE CONSUMER

_LIST ALL CONSUMERS_

GET REQUEST
localhost:3000/consumer

RETURNS AN ARRAY OF CONSUMERS

_AUTHENTICATE USER_

POST REQUEST
localhost:3000/consumer

RETURNS A BEARER TOKEN

<!-- AUTHENTICATION NEEDED -->

_UPDATE A CONSUMER_

PUT REQUEST
localhost:3000/consumer

RETURNS A SINGLE CONSUMER

_DELETE A CONSUMER_

DELETE REQUEST
localhost:3000/consumer

RETURNS
TRUE IF DELETED
FALSE IF NOT DELETED