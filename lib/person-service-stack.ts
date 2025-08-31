import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { IConfig } from "./config/config.interface";

import { DynamoDbResource } from "./resources/dynamodb";
import { IamResource } from "./resources/iam";
import { LambdaResource } from "./resources/lambda";
import { ApiGatewayResource } from "./resources/api-gateway";
import { SnsResource } from "./resources/sns";
import { LambdaFunctionNames } from "./enums/lambda-function-names";
import path from "path";

export class PersonServiceStack extends Stack {
	private config: IConfig;
	private iamResource: IamResource;
	private dynamoDbResource: DynamoDbResource;
	private createPersonLambda: LambdaResource;
	private listPersonsLambda: LambdaResource;
	private apiGatewayResource: ApiGatewayResource;
	private snsResource: SnsResource;

	constructor(scope: Construct, id: string, config: IConfig, props: StackProps) {
		super(scope, id, props);

		this.config = config;
		this.iamResource = new IamResource(this, 'IamResource', config);

		this.initializeLambdaResources();
		this.initializeDynamoDbResource();
		this.initializeApiGatewayResource();
	}

	private initializeLambdaResources(): void {

		this.snsResource = new SnsResource(this, 'SnsResource', this.config);
		this.createPersonLambda = new LambdaResource(this, LambdaFunctionNames.CREATE_PERSON, this.config, {
			functionName: LambdaFunctionNames.CREATE_PERSON,
			handler: "handler",
			entry: "src/handlers/create-person.ts",
			role: this.iamResource.role,
			environment: {
				SNS_TOPIC_ARN: this.snsResource.topicArn,
				...this.defaultEnvironmentVariables
			}
		});

		this.snsResource.grantPublishPermissions(this.createPersonLambda.function);

		// this.listPersonsLambda = new LambdaResource(this, LambdaFunctionNames.LIST_PERSONS, this.config, {
		// 	functionName: LambdaFunctionNames.LIST_PERSONS,
		// 	handler: 'src/handlers/list-persons.handler',
		// 	role: this.iamResource.role,
		// 	environment: {
		// 		...this.defaultEnvironmentVariables
		// 	}
		// });
	}

	private initializeApiGatewayResource(): void {
		this.apiGatewayResource = new ApiGatewayResource(this, 'ApiGatewayResource', this.config);

		this.apiGatewayResource.createEndpointLambda('POST', LambdaFunctionNames.CREATE_PERSON, this.createPersonLambda.function);
		// this.apiGatewayResource.createEndpointLambda('GET', LambdaFunctionNames.LIST_PERSONS, this.listPersonsLambda.function);
	}

	private initializeDynamoDbResource(): void {
		this.dynamoDbResource = new DynamoDbResource(this, 'DynamoDbResource', this.config);
		this.iamResource.addDynamoDbPolicy();
	}

	private get defaultEnvironmentVariables(): Record<string, string> {
		return {
			REGION: this.config.region,
			DYNAMODB_TABLE: this.config.tableName
		};
	}
}