# DOOF DELIVERY APP

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

CreateConsumer DTO =>

fistName:string
lastName:string
email:string
password:string
address:string

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

UpdateConsumer DTO =>

fistName?:string
lastName?:string
email?:string
password?:string
address?:string

RETURNS A SINGLE CONSUMER

_DELETE A CONSUMER_

DELETE REQUEST
localhost:3000/consumer

RETURNS
TRUE IF DELETED
FALSE IF NOT DELETED

**OWNER**

_OWNER DATA_

id:string
firstName:string
lastName:string
email:string
password:string
restaurants?:Restaurant[]

_CREATE AN OWNER_

POST REQUEST
localhost:3000/owner

CreateOwner DTO =>

fistName?:string
lastName?:string
email?:string
password?:string

RETURNS A SINGLE OWNER

_LIST ALL OWNERS_

GET REQUEST
localhost:3000/owner

<!-- AUTHENTICATION NEEDED -->

_UPDATE A OWNER_

PUT REQUEST
localhost:3000/owner

UpdateOwner DTO =>

fistName?:string
lastName?:string
email?:string
password?:string

RETURNS A SINGLE OWNER

_DELETE A OWNER_

DELETE REQUEST
localhost:3000/owner

RETURNS
TRUE IF DELETED
FALSE IF NOT DELETED
