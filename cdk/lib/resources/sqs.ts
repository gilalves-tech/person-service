import { Construct } from "constructs";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { IConfig } from "../../config/config.interface";
import { BaseResource } from "./base-resource";

export class SqsResource extends BaseResource {
	private readonly sqsQueue: Queue;

	constructor(scope: Construct, id: string, config: IConfig, queueName: string) {
		super(scope, id, config);

		this.sqsQueue = new Queue(this, id, {
			queueName,
		});
	}

	public get queue(): Queue {
		return this.sqsQueue;
	}
}