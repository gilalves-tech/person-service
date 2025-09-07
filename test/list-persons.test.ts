import { handler } from '../src/handlers/list-persons';
import { ListPersonsRequestHandler } from '../src/application/list-persons-request-handler';
import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';

jest.mock('../src/infrastructure/dynamo-db-client', () => ({
	DynamoDbClient: {
		getInstance: () => ({}),
	},
}));

jest.mock('../src/application/list-persons-request-handler', () => ({
	ListPersonsRequestHandler: jest.fn(),
}));

const dummyContext = {} as Context;
const dummyCallback = (() => { }) as Callback;

describe('list-persons handler', () => {
	const mockHandle = jest.fn();

	beforeEach(() => {
		(ListPersonsRequestHandler as jest.Mock).mockImplementation(() => ({
			handle: mockHandle,
		}));
		jest.clearAllMocks();
	});

	it('Should return 200 and the list of persons', async () => {
		const persons = [
			{ personId: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'Street' },
			{ personId: '2', firstName: 'Jane', lastName: 'Smith', phoneNumber: '456', address: 'Avenue' },
		];

		mockHandle.mockResolvedValue(persons);

		const event = {} as APIGatewayProxyEventV2;

		const result = await handler(event, dummyContext, dummyCallback) as any;

		expect(result.statusCode).toBe(200);
		expect(JSON.parse(result.body)).toEqual(persons);
		expect(mockHandle).toHaveBeenCalled();
	});

	it('Should return 500 on error', async () => {
		mockHandle.mockRejectedValueOnce(new Error('fail'));

		const event = {} as APIGatewayProxyEventV2;

		const result = await handler(event, dummyContext, dummyCallback) as any;

		expect(result.statusCode).toBe(500);
		expect(JSON.parse(result.body)).toEqual({ message: 'Internal server error' });
		expect(mockHandle).toHaveBeenCalled();
	});
});