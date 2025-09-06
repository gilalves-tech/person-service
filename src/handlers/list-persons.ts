import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDbClient } from "../infrastructure/dynamo-db-client";
import { ListPersonsRequestHandler } from "../application/list-persons-request-handler";

const dynamoDbClient = DynamoDbClient.getInstance();

export const handler: APIGatewayProxyHandlerV2 = async () => {
	try {
		const requestHandler = new ListPersonsRequestHandler(dynamoDbClient);
		const persons = await requestHandler.handle();

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