import { IConfig } from "./config.interface";

export abstract class Config implements IConfig {
	readonly abstract accountId: string;
	readonly abstract region: string;
	readonly abstract stage: string;

	readonly stackName = "PersonServiceStack";

	get tableName(): string {
		return `persons-table-${this.stage}`;
	}

	get apiName(): string {
		return `person-api-${this.stage}`;
	}

	get topicName(): string {
		return `person-created-topic-${this.stage}`;
	}
}