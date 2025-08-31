import { PersonCreateRequest } from "./person-create-request.interface";

export interface Person extends PersonCreateRequest {
	readonly personId: string;
}