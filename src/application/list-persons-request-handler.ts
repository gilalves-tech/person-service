import { Person } from "../interfaces/person.interface";
import { IDynamoDbClient } from "src/interfaces/dynamo-db-client.interface";
import { RequestHandler } from "src/interfaces/request-handler.interface";

export class ListPersonsRequestHandler implements RequestHandler<undefined, Person[]> {
	constructor(
		private dynamoDbClient: IDynamoDbClient
	) { }

	async handle(): Promise<Person[]> {
		return await this.dynamoDbClient.listPersons();
	}
}
