# Description

Doof App is a Node.js-based RESTful API. The goal is to manage information about restaurants and their respective menus.

## Features

The API provides the following functionalities:

- List all restaurants
- Register new restaurants
- Retrieve data from a restaurant
- Modify restaurant data
- Delete a restaurant
- List all products from a restaurant
- Create a product for a restaurant
- Modify a product for a restaurant
- Delete a product from a restaurant

## Data Structure

### Restaurant

- Restaurant photo
- Restaurant name
- Restaurant address
- Restaurant operating hours (e.g., Monday to Friday from 09:00 to 18:00 and Saturday to Sunday from 11:00 to 20:00).

### Product

- Product photo
- Product name
- Product price
- Product category (e.g., Sweets, Savory, Juices...)
- Description for the product promotion (when applicable)
- Promotional price (when applicable)
- Days of the week and time when the product should be on promotion (when applicable)

  
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
**Endpoint:**  `POST /consumer/auth`


**Request Body:**
```json
{
  "email": "string",
  "password": "string",
}
```
Response: Returns a bearer token.

### List All Consumers

**Endpoint:** `GET /consumer`

Response: Returns an array of consumers.

### Update a Consumer

**Endpoint:** `PUT /consumer`

**Request Body:**

*Optional*

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "address": "string"
}
```

Response: Returns a  single consumer.


### Delete a Consumer

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
  "password": "string",
}
```
Response: Returns a single owner.

### Authenticate Owner
**Endpoint:**  `POST /owner/auth`


**Request Body:**
```json
{
  "email": "string",
  "password": "string",
}
```
Response: Returns a bearer token.

### List All Owners

**Endpoint:** `GET /owner`

Response: Returns an array of owners.

### Update an Owner

**Endpoint:** `PUT /owner`

**Request Body:**

*Optional*

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
}
```

Response: Returns a  single owner.


### Delete an Owner

**Endpoint:** `Delete /owner`

*Also deletes all restaurants associated to its Owner*

Response: 

`true` if deleted

`false` if not deleted


