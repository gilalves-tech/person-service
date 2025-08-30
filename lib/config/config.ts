import { IConfig } from "./config.interface";

export abstract class Config implements IConfig {

	readonly abstract accountId: string;
	readonly abstract region: string;
	readonly abstract stage: string;

	readonly stackName = "PersonServiceStack";

	get tableName(): string {
		return `Persons-${this.stage}`;
	}
}