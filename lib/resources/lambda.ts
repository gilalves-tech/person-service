
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import { BaseResource } from "./base-resource";
import { IConfig } from "../config/config.interface";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";

export class LambdaResource extends BaseResource {
	private lambdaFunction: NodejsFunction;

	constructor(scope: Construct, id: string, config: IConfig, props: NodejsFunctionProps) {
		super(scope, id, config);

		this.lambdaFunction = new NodejsFunction(this, id, {
			...props,
			memorySize: 512,
			runtime: Runtime.NODEJS_20_X,
			timeout: Duration.seconds(15),
			bundling: {
				target: 'es2020'
			}
		});
	}

	public get function(): NodejsFunction {
		return this.lambdaFunction;
	}
}
