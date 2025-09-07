import * as dotenv from 'dotenv';
import { Config } from "./config";
import { RemovalPolicy } from 'aws-cdk-lib';

dotenv.config({ path: `.env.dev` });

export class ConfigDev extends Config {
	readonly testQueueName = `person-service-test-queue-${this.stage}`;
	readonly dynamoRemovalPolicy = RemovalPolicy.DESTROY;
}