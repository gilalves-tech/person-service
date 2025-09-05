import { Person } from "../interfaces/person.interface";
import { EventType } from "src/enums/event-type.enum";

export interface ISnsClient {
	publish(eventType: EventType, data: Person): Promise<void>;
}