import { Person } from "../interfaces/person.interface";
import { EventTypes } from "src/enums/event-types";

export interface PersonEventPublisher {
	publish(eventType: EventTypes, data: Person): Promise<void>;
}