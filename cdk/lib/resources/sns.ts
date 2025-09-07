import { Construct } from "constructs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { BaseResource } from "./base-resource";
import { IConfig } from "../../config/config.interface";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class SnsResource extends BaseResource {
	private readonly topic: Topic;

	constructor(scope: Construct, id: string, config: IConfig) {
		super(scope, id, config);

		this.topic = new Topic(this, id, {
			topicName: this.config.topicName,
			displayName: "Person Created Event",
		});
	}

	public grantPublish(lambdaFunction: NodejsFunction) {
		this.topic.grantPublish(lambdaFunction);
	}

	public addSqsSubscription(queue: Queue) {
        this.topic.addSubscription(new SqsSubscription(queue));
    }

	public get topicArn(): string {
		return this.topic.topicArn;
	}
}