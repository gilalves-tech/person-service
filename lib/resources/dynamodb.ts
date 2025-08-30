import { RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { IConfig } from '../config/config.interface';
import { BaseResource } from './base-resource';

export class DynamoDbResource extends BaseResource {
	private readonly personTable: Table;

	constructor(scope: Construct, id: string, config: IConfig) {
		super(scope, id, config);

		this.personTable = new Table(this, 'PersonsTable', {
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
}
