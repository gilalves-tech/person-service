import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PersonServiceStack } from '../cdk/lib/person-service-stack';
import { ConfigDev } from '../cdk/config/config.dev';

describe('PersonServiceStack', () => {
	let app: App;
	let config: ConfigDev;
	let stack: PersonServiceStack;
	let template: Template;

	beforeEach(() => {
		jest.clearAllMocks();

		app = new App();
		config = new ConfigDev();
		stack = new PersonServiceStack(app, 'TestStack', config, {});
		template = Template.fromStack(stack);
	});

	test('DynamoDB Table Created', () => {
		template.hasResourceProperties('AWS::DynamoDB::Table', {
			TableName: config.tableName
		});
	});

	test('SNS Topic Created', () => {
		template.resourceCountIs('AWS::SNS::Topic', 1);
	});

	test('Lambda Function Created', () => {
		template.resourceCountIs('AWS::Lambda::Function', 2);
	});

	test('API Gateway Created', () => {
		template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
	});
});