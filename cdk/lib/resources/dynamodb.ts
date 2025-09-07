import { RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { IConfig } from '../../config/config.interface';
import { BaseResource } from './base-resource';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class DynamoDbResource extends BaseResource {
	private readonly personTable: Table;

	constructor(scope: Construct, id: string, config: IConfig) {
		super(scope, id, config);

		this.personTable = new Table(this, id, {
			tableName: config.tableName,
			partitionKey: {
				name: 'personId',
				type: AttributeType.STRING
			},
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		new CfnOutput(this, 'PersonsTableName', {
			value: this.personTable.tableName,
			description: 'The DynamoDB table name for persons',
		});
	}

	public grantWrite(lambdaFunction: NodejsFunction) {
		this.personTable.grantWriteData(lambdaFunction);
	}

	public grantRead(lambdaFunction: NodejsFunction) {
		this.personTable.grantReadData(lambdaFunction);
	}
}
