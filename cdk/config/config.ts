import * as dotenv from 'dotenv';
import { RemovalPolicy } from 'aws-cdk-lib';
import { IConfig } from "./config.interface";
import { accessEnv } from '../../src/utils/accessEnv';

export abstract class Config implements IConfig {
	constructor(readonly stage: string) {
		dotenv.config({ path: `.env.${stage}` });
	}

	abstract readonly dynamoRemovalPolicy: RemovalPolicy;

	readonly accountId: string = accessEnv('AWS_ACCOUNT_ID');
	readonly region: string = accessEnv('AWS_REGION');

	get stackName(): string {
		return `PersonServiceStack-${this.stage}`;
	}

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