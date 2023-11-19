# Description

Doof App is a Node.js-based RESTful API. The goal is to manage information about restaurants and their respective menus.


# Techologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)

# API Documentation

## Consumer

### Consumer Data

- `id`: string
- `firstName`: string
- `lastName`: string
- `email`: string
- `password`: string
- `address`: string

### Create a Consumer

**Endpoint:** `POST /consumer`

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "address": "string"
}
```

Response: Returns a single consumer.

### Authenticate Consumer

**Endpoint:** `POST /consumer/auth`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

Response: Returns a bearer token.

### List All Consumers

**Endpoint:** `GET /consumer`

Response: Returns an array of consumers.

### Update a Consumer

*REQUIRES CONSUMER BEARER TOKEN*

**Endpoint:** `PUT /consumer`

**Request Body:**

_Optional_

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "address": "string"
}
```

Response: Returns a single consumer.

### Delete a Consumer

*REQUIRES CONSUMER BEARER TOKEN*

**Endpoint:** `Delete /consumer`

Response:

`true` if deleted

`false` if not deleted

## Owner

### Owner Data

- `id`: string
- `firstName`: string
- `lastName`: string
- `email`: string
- `password`: string
- `restaurants`: Restaurant[]

### Create an Owner

**Endpoint:** `POST /owner`

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

Response: Returns a single owner.

### Authenticate Owner

**Endpoint:** `POST /owner/auth`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

Response: Returns a bearer token.

### List All Owners

**Endpoint:** `GET /owner`

Response: Returns an array of owners.

### Update an Owner

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `PUT /owner`

**Request Body:**

_Optional_

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

Response: Returns a single owner.

### Delete an Owner

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `Delete /owner`

_Also deletes all restaurants associated to its Owner_

Response:

`true` if deleted

`false` if not deleted

## Product

### Product Data

- `id`: string
- `name`: string
- `price`: number
- `category`: ProductCategory
- `imageUrl`: string
- `restaurantId`: string
- `isDiscount`: boolean
- `discountPrice`?: number
- `discountStart`?: Datetime
- `discountEnd`?: Datetime
- `discountText`?: string

### Create a Product

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `POST /product`

**Request Body:**

```json
{
"name": "string",
"price": "number",
"category": "ProductCategory",
"imageUrl": "string",
"restaurantId": "string",
"isDiscount": "boolean",

_OPTIONAL_

"discountPrice": "number",
"discountTime": "Date",
"discountText": "string"
}
```

Response: Returns a single product.

### Update a Product

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `PUT /product/${productId}`

**Request Body:**

_Optional_

```json
{
  "name": "string",
  "price": "number",
  "category": "ProductCategory",
  "imageUrl": "string",
  "restaurantId": "string",
  "isDiscount": "boolean",
  "discountPrice": "number",
  "discountTime": "Date",
  "discountText": "string"
}
```

Response: Returns a single product.

### Delete a Product

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `Delete /product/${productId}`

Response:

`true` if deleted

`false` if not deleted

## Restaurant

### Restaurant Data

- `id`: string
- `name`: string
- `address`: string
- `imageUrl`: string
- `weekOpeningTime`: Date
- `weekClosingTime`: Date
- `weekendOpeningTime`: Date
- `weekendClosingTime`: Date
- `ownerId`: string

### List all Restaurants

**Endpoint:** `GET /restaurant`

Response: Returns an array of restaurants.

### Create a Restaurant

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `POST /restaurant`

**Request Body:**

```json
{
"name": "string",
"address": "string",
"imageUrl": "string",
"weekOpeningTime": "Date",
"weekClosingTime": "Date",
"weekendOpeningTime": "Date"
"weekendClosingTime": "Date"
```

Response: Returns a single restaurant.

### Update a Restaurant

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `PUT /restaurant/${restaurantId}`

**Request Body:**

_Optional_

```json
{
"name": "string",
"address": "string",
"imageUrl": "string",
"weekOpeningTime": "Date",
"weekClosingTime": "Date",
"weekendOpeningTime": "Date"
"weekendClosingTime": "Date"
}
```


Response: Returns a single restaurant.

### Delete a Restaurant

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `Delete /restaurant/${restaurantId}`

Response:

`true` if deleted

`false` if not deleted

## Order

### Order Data

- `id`: string
- `createdAt`: Date
- `updatedAt`: Date
- `state`: OrderState
- `consumerId`: string
- `restaurantId`: string
- `products`: Product[ ]


### List Orders by Restaurant ID

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `GET /order/${restaurantId}`

Response: Returns an array of orders made to a single restaurant.

### Create Order

*REQUIRES CONSUMER BEARER TOKEN*

**Endpoint:** `POST /order/${restaurantId}`

**Request Body:**

```json
{
"ids": "string[ ]"
}
```

Response: Returns a single order.


### Update an Order

*REQUIRES OWNER BEARER TOKEN*

**Endpoint:** `PUT /order/${orderId}`

**Request Body:**

```json
{
"state": "OrderState"
}
```

Response: Returns a single order
