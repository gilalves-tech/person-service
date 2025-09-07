import { PublishCommand } from '@aws-sdk/client-sns';
import { SnsClient } from '../src/infrastructure/sns-client';
import { EventTypes } from '../src/enums/event-types';
import { Person } from '../src/interfaces/person.interface';

jest.mock('@aws-sdk/client-sns', () => ({
	SNSClient: jest.fn().mockImplementation(() => ({
		send: jest.fn().mockResolvedValue({}),
	})),
	PublishCommand: jest.fn(),
}));

jest.mock('../src/utils/accessEnv', () => ({
	accessEnv: (key: string) => key === 'REGION' ? 'eu-central-1' : 'test-topic-arn',
}));

describe('SnsClient', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should publish a message to SNS', async () => {
		const client = SnsClient.getInstance();
		const person: Person = { personId: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'Street' };
		const eventType = EventTypes.PERSON_CREATED;

		await expect(client.publish(eventType, person)).resolves.toBeUndefined();

		expect(PublishCommand).toHaveBeenCalledWith(expect.objectContaining({
			TopicArn: 'test-topic-arn',
			Message: JSON.stringify(person),
		}));
	});
});