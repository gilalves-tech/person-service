import { Config } from "./config";

export class ConfigDev extends Config {
	readonly accountId = "087895311216";
	readonly region = "eu-central-1";
	readonly stage = "dev";
	readonly testQueueName = `person-service-test-queue-${this.stage}`;
}