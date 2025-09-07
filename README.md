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


## Considerations
- For simplicity, I added a list persons endpoint that uses a DynamoDB Scan operation. However, Scan can be inefficient for large datasets since it reads the entire table. In a real-world setup, I would instead use a Query with a proper key or design Global Secondary Indexes (GSIs) to support common access patterns.

- As it stands the system can end up in an inconsistent state. If the person item is successfully stored in DynamoDB but the event publishing fails, subscribers won't be notified of the creation. To ensure consistency, both operations should ideally happen in a single transaction. This could be addressed using the transactional outbox pattern or DynamoDB Streams. Assuming that this is likely out of scope for this assignment, I focused on implementing the main create-person flow.

- I deployed the app to my personal AWS account for testing with a config.dev.ts file. To extend it to other environments, you'd create another config file (e.g., config.prd.ts) with the production specific settings.

- I implemented minimal IAM permissions to allow the app to run. Other security mechanisms (e.g., JWT tokens, API keys, user authentication) weren’t included here, as I considered them outside the scope of this assessment.