import { Construct } from "constructs";
import {
	LambdaIntegration,
	Resource,
	RestApi,
	RequestValidator,
	Model,
	JsonSchemaVersion,
	JsonSchemaType,
	MethodOptions
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { BaseResource } from "./base-resource";
import { IConfig } from "../../config/config.interface";
import { LambdaFunctionNames } from "../../enums/lambda-function-names";

export class ApiGatewayResource extends BaseResource {
	private restApi: RestApi;
	private requestValidator: RequestValidator;
	private personResource: Resource;

	constructor(scope: Construct, id: string, config: IConfig) {
		super(scope, id, config);

		this.restApi = new RestApi(this, id, {
			restApiName: config.apiName,
			deployOptions: {
				stageName: this.config.stage,
			},
		});

		this.personResource = this.restApi.root.addResource('person');

		this.requestValidator = new RequestValidator(this, "RequestValidator", {
			restApi: this.restApi,
			validateRequestBody: true,
			validateRequestParameters: false,
		});
	}

	public createEndpointLambda(method: string, lambdaName: LambdaFunctionNames, lambda: NodejsFunction) {
		const options = this.createMethodOptions(lambdaName);

		this.personResource.addMethod(method, new LambdaIntegration(lambda), options);
	}

	private createMethodOptions(lambdaName: LambdaFunctionNames): MethodOptions {
		if (lambdaName === LambdaFunctionNames.CREATE_PERSON) {
			return {
				requestValidator: this.requestValidator,
				requestModels: {
					"application/json": this.createPersonModel()
				}
			};
		}

		return {
			methodResponses: [
				{
					statusCode: "200",
				},
			],
		}
	}

	private createPersonModel(): Model {
		const model = new Model(this, 'CreatePersonModel', {
			restApi: this.restApi,
			contentType: "application/json",
			modelName: "CreatePersonRequest",
			schema: {
				schema: JsonSchemaVersion.DRAFT4,
				title: "CreatePersonRequest",
				type: JsonSchemaType.OBJECT,
				required: ["firstName", "lastName", "phoneNumber", "address"],
				properties: {
					firstName: {
						type: JsonSchemaType.STRING
					},
					lastName: {
						type: JsonSchemaType.STRING
					},
					phoneNumber: {
						type: JsonSchemaType.STRING
					},
					address: {
						type: JsonSchemaType.STRING
					},
				},
			},
		});

		return model;
	}

	public get api(): RestApi {
		return this.restApi;
	}
}