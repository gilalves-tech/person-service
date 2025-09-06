import { Person } from "../interfaces/person.interface";
import { PersonRepository } from "../interfaces/person-repository.interface";
import { RequestHandler } from "../interfaces/request-handler.interface";

export class ListPersonsRequestHandler implements RequestHandler<undefined, Person[]> {
	constructor(
		private dynamoDbClient: PersonRepository
	) { }

	async handle(): Promise<Person[]> {
		return await this.dynamoDbClient.listPersons();
	}
}
