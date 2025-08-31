# Person Service

This repository contains a serverless microservice built as part of the assessment for the Fullstack Engineer role at Tikkie.

The purpose of this project is to demonstrate building a scalable and maintainable backend service using AWS Serverless technologies, following best practices around infrastructure-as-code, API design, and data storage.


## Functionality

The Person Service exposes a RESTful API for managing person data. It uses AWS API Gateway, Lambda, and DynamoDB to provide scalable, on-demand compute and persistence. The available endpoints are:

- POST /person -> Create a new person
- GET /person -> List all persons


## Deployment
- npm install
- cdk bootstrap
- npm run deploy:dev


## Testing

1. Create a person

POST https://rzif4r01eg.execute-api.eu-central-1.amazonaws.com/dev
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+31123456789",
    "address": "3516 Hidden Street"
}
```

2. List persons

GET https://rzif4r01eg.execute-api.eu-central-1.amazonaws.com/dev

