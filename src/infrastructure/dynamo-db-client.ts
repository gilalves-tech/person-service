import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Person } from "src/interfaces/person.interface";
import { accessEnv } from "src/utils/accessEnv";

export class DynamoDbClient {
	private static instance: DynamoDbClient;
	private client: DynamoDBDocumentClient;
	private tableName: string;

	private constructor() {
		const region = accessEnv("REGION");
		this.tableName = accessEnv("DYNAMODB_TABLE");

		const dynamoClient = new DynamoDBClient({ region });
		this.client = DynamoDBDocumentClient.from(dynamoClient);
	}

	public static getInstance(): DynamoDbClient {
		if (!DynamoDbClient.instance) {
			DynamoDbClient.instance = new DynamoDbClient();
		}
		return DynamoDbClient.instance;
	}

	async putPerson(person: Person): Promise<void> {
		await this.client.send(
			new PutCommand({
				TableName: this.tableName,
				Item: person,
			})
		);
	}

	async listPersons(): Promise<Person[]> {
		const result = await this.client.send(
			new ScanCommand({
				TableName: this.tableName,
			})
		);

		return (result.Items as Person[]) || [];
	}
}
