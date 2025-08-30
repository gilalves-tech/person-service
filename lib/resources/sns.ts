import { Construct } from "constructs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { BaseResource } from "./base-resource";
import { IConfig } from "../config/config.interface";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class SnsResource extends BaseResource {
	private readonly topic: Topic;

	constructor(scope: Construct, id: string, config: IConfig) {
		super(scope, id, config);

		this.topic = new Topic(this, "PersonCreatedTopic", {
			topicName: `person-created-${config.stage}`,
			displayName: "Person Created Event",
		});
	}

	public grantPublishPermissions(lambdaFunction: NodejsFunction) {
		this.topic.grantPublish(lambdaFunction);
	}

	public get topicArn(): string {
		return this.topic.topicArn;
	}
}