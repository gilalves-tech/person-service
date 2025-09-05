import { Person } from "src/interfaces/person.interface";

export interface IDynamoDbClient {
	putPerson(person: Person): Promise<void>;
	listPersons(): Promise<Person[]>;
}
