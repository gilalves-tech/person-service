import { Person } from "src/interfaces/person.interface";

export interface PersonRepository {
	putPerson(person: Person): Promise<void>;
	listPersons(): Promise<Person[]>;
}
