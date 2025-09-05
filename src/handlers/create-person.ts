import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { CreatePersonRequestHandler } from "../application/create-person-request-handler";
import { PersonCreateRequest } from "../interfaces/person-create-request.interface";
import { DynamoDbClient } from "../infrastructure/dynamo-db-client";
import { SnsClient } from "../infrastructure/sns-client";

const dynamoDbClient = DynamoDbClient.getInstance();
const snsClient = SnsClient.getInstance();

export const handler: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEventV2) => {
	try {
		if (!event.body) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: "Missing request body" }),
			};
		}

		const body = JSON.parse(event.body) as PersonCreateRequest;

		const requestHandler = new CreatePersonRequestHandler(dynamoDbClient, snsClient);
		const person = await requestHandler.handle(body);

		return {
			statusCode: 201,
			body: JSON.stringify(person),
		};
	} catch (err) {
		console.error("Error creating person:", err);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal server error" }),
		};
	}
};
