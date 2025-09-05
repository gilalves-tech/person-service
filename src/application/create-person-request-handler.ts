import { v4 as uuidv4 } from "uuid";
import { Person } from "../interfaces/person.interface";
import { PersonCreateRequest } from "../interfaces/person-create-request.interface";
import { EventType } from "../enums/event-type.enum";
import { IDynamoDbClient } from "src/interfaces/dynamo-db-client.interface";
import { ISnsClient } from "src/interfaces/sns-client.interface";
import { RequestHandler } from "src/interfaces/request-handler.interface";

export class CreatePersonRequestHandler implements RequestHandler<PersonCreateRequest, Person> {
	constructor(
		private dynamoDbClient: IDynamoDbClient,
		private snsClient: ISnsClient
	) { }

	async handle(request: PersonCreateRequest): Promise<Person> {
		const personId = uuidv4();
		const person: Person = { personId, ...request };

		await this.dynamoDbClient.putPerson(person);
		await this.snsClient.publish(EventType.PERSON_CREATED, person);

		return person;
	}
}
