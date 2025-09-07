# Person Service

This repository contains a serverless microservice built as part of the assessment for the Fullstack Engineer role at Tikkie.

The purpose of this project is to demonstrate building a scalable and maintainable backend service using AWS Serverless technologies, with attention to infrastructure-as-code, API design, and data storage practices.

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

POST https://wla3yuzq80.execute-api.eu-central-1.amazonaws.com/dev/person
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+31123456789",
    "address": "3516 Hidden Street"
}
```

2. List persons

GET https://wla3yuzq80.execute-api.eu-central-1.amazonaws.com/dev/person


## Considerations
- This project uses AWS CDK. By default, the deployment script uses the dev AWS profile. Please make sure to configure your AWS credentials locally, or update the --profile flag in package.json to match your AWS profile.

- Given it was not the focus of the assigment, I implemented a simple list persons endpoint using DynamoDB Scan operation. This operation can be quite inefficient for large datasets since it reads the entire table. In a real-world setup, techniques like GSIs could help support common access patterns.

- At the moment, the system can end up in an inconsistent state. If a person item is successfully stored, but the event publishing fails, subscribers won't be notified of the creation.
To ensure consistency, both operations should happen in a single transaction. This could be adressed with DyanmoDB Streams to ensure one atomic write and guaranteed notification. Assuming this is likely out of scope for the assignment, I focused on the create person flow without reassuring consistency.

- I included a simple SQS queue to help test the publishing of the person-created-event upon creation of the person (using message polling).

- I used my AWS account to test the stack creation and if endpoints work as expected (config.dev.ts). You could either modify this file for your environment configuration or create new files for new account configurations (i.e. config.prod.ts).

- I implemented basic security with minimal IAM permissions. Other features like JWT tokens, API keys, or user authentication haven't been included, as I focused on the core functionality for the assessment.

