export interface IConfig {
	readonly accountId: string;
	readonly region: string;
	readonly stage: string;
	readonly stackName: string;
	readonly tableName: string;
	readonly apiName: string;
	readonly topicName: string;
	readonly testQueueName?: string;
}
