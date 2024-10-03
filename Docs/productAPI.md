# product API documentation

## dev-Jaunius

## npm
- "express": "^4.21.0",
- "express-validator": "^7.2.0",
- "jsonwebtoken": "^9.0.2",
- "mongodb": "^6.9.0",
- "mongoose": "^8.6.3",
- "passport": "^0.7.0",
- "passport-jwt": "^4.0.1",
- "winston": "^3.14.2"

## Description
- product API is used to manage products in DATABASE, which is connected powered by mongodb.
  Basic routes to get data in JSON format, to display on Front. More complex routes
  were created to add, update and delete products. They require parameters inserted 
  by user (Front). Back recieves information, processes it and send result back to 
  the front. Response may vary because of many validation steps.

## Requirments
- Written in Typescript
- ExpressJS { Request, Response, NextFunction }
- MongoDB DATABASE {productModel from "../Database/productModel.ts"}
- Utility {from "../utils/idgen.ts"}
- jsonwebtoken {from "../utils/token.ts"}

## Capabilities
- GET allProducts from DATABASE

- GET productById from DATABASE
@parmas
{
    id:number
}

- POST new product onto DATABASE
@params
{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

- DELETE any product from DATABASE
@params
{
    id: number
}

- PATCH existing product in DATABASE
@params
{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}
```javascript
 Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        fieldsToUpdate[key] = req.body[key];
      }
    });
```
Filters NULL and UNDEFINED (not specified) fields

