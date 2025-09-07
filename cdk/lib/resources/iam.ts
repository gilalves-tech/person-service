import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { BaseResource } from "./base-resource";
import { IConfig } from "../../config/config.interface";

export class IamResource extends BaseResource {
	private iamRole: Role;

	constructor(scope: Construct, id: string, config: IConfig, roleName: string) {
		super(scope, id, config);

		this.iamRole = new Role(this, id, {
			roleName: `${roleName}-${this.config.stage}`,
			assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
			managedPolicies: this.getManagedAwsLambdaPolicies().map(policy => ManagedPolicy.fromAwsManagedPolicyName(policy)),
		});
	}

	public get role(): Role {
		return this.iamRole;
	}

	private getManagedAwsLambdaPolicies(): string[] {
		return [
			'service-role/AWSLambdaBasicExecutionRole',
		];
	}
}
