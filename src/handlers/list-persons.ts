import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDbClient } from "../infrastructure/dynamo-db-client";

const dynamoDbClient = DynamoDbClient.getInstance();

export const handler: APIGatewayProxyHandlerV2 = async () => {
	try {
		const persons = await dynamoDbClient.listPersons();

		return {
			statusCode: 200,
			body: JSON.stringify(persons),
		};
	} catch (err) {
		console.error("Error listing persons:", err);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal server error" }),
		};
	}
};