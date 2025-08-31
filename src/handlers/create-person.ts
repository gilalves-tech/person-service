import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { Person } from "../interfaces/person.interface";
import { PersonCreateRequest } from "../interfaces/person-create-request.interface";
import { DynamoDbClient } from "../infrastructure/dynamo-db-client";
import { SnsClient } from "../infrastructure/sns-client";
import { EventType } from "../enums/event-type.enum";

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

		const personId = uuidv4();
		const person: Person = {
			personId,
			...body,
		}
		
		await dynamoDbClient.putPerson(person);

		await snsClient.publish(EventType.PERSON_CREATED, person);

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
