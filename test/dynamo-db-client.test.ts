import { DynamoDbClient } from '../src/infrastructure/dynamo-db-client';
import { Person } from '../src/interfaces/person.interface';

const sendMock = jest.fn();
jest.mock('@aws-sdk/lib-dynamodb', () => ({
	PutCommand: jest.fn(),
	ScanCommand: jest.fn(),
	DynamoDBDocumentClient: {
		from: () => ({
			send: sendMock,
		}),
	},
}));

jest.mock('@aws-sdk/client-dynamodb', () => ({
	DynamoDBClient: jest.fn(),
}));

jest.mock('../src/utils/accessEnv', () => ({
	accessEnv: (key: string) => key === 'REGION' ? 'eu-central-1' : 'test-table',
}));

describe('DynamoDbClient', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should put a person', async () => {
		sendMock.mockResolvedValue({});
		const client = DynamoDbClient.getInstance();
		const person: Person = { personId: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'Street' };

		await expect(client.putPerson(person)).resolves.toBeUndefined();
		expect(sendMock).toHaveBeenCalled();
	});

	it('Should list persons', async () => {
		const items = [{ personId: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'Street' }];
		sendMock.mockResolvedValue({ Items: items });
		const client = DynamoDbClient.getInstance();

		await expect(client.listPersons()).resolves.toEqual(items);
		expect(sendMock).toHaveBeenCalled();
	});

	it('Should return empty array if no items', async () => {
		sendMock.mockResolvedValue({});
		const client = DynamoDbClient.getInstance();

		await expect(client.listPersons()).resolves.toEqual([]);
	});
});