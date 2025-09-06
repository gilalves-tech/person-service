import { v4 as uuidv4 } from "uuid";
import { Person } from "../interfaces/person.interface";
import { PersonCreateRequest } from "../interfaces/person-create-request.interface";
import { EventType } from "../enums/event-type.enum";
import { PersonRepository } from "../interfaces/person-repository.interface";
import { PersonEventPublisher } from "src/interfaces/person-event-publisher.interface";
import { RequestHandler } from "src/interfaces/request-handler.interface";

export class CreatePersonRequestHandler implements RequestHandler<PersonCreateRequest, Person> {
	constructor(
		private personRepository: PersonRepository,
		private eventPublisher: PersonEventPublisher
	) { }

	async handle(request: PersonCreateRequest): Promise<Person> {
		const personId = uuidv4();
		const person: Person = { personId, ...request };

		await this.personRepository.putPerson(person);
		await this.eventPublisher.publish(EventType.PERSON_CREATED, person);

		return person;
	}
}
