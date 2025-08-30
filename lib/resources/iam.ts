import { ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { BaseResource } from "./base-resource";
import { IConfig } from "../config/config.interface";

export class IamResource extends BaseResource {
	private iamRole: Role;

	constructor(scope: Construct, id: string, config: IConfig) {
		super(scope, id, config);

		this.iamRole = new Role(this, 'PersonServiceRole', {
			roleName: id,
			assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
			managedPolicies: this.getManagedAwsLambdaPolicies().map(policy => ManagedPolicy.fromAwsManagedPolicyName(policy)),
		});
	}

	public get role(): Role {
		return this.iamRole;
	}

	public addDynamoDbPolicy(): void {
		const policy = new PolicyStatement({
			actions: [
				"dynamodb:PutItem",
				"dynamodb:GetItem",
				"dynamodb:Scan",
			],
			resources: [
				`arn:aws:dynamodb:${this.config.region}:${this.config.accountId}:table/${this.config.tableName}`
			],
		});

		this.iamRole.addToPolicy(policy);
	}

	private getManagedAwsLambdaPolicies(): string[] {
		return [
			'service-role/AWSLambdaBasicExecutionRole',
			'service-role/AWSLambdaDynamoDBExecutionRole',
		];
	}
}
