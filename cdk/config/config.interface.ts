export interface IConfig {
	readonly accountId: string;
	readonly region: string;
	readonly stage: string;
	readonly stackName: string;
	readonly tableName: string;
	// readonly roleName: string;
	readonly apiName: string;
	readonly topicName: string;
}
