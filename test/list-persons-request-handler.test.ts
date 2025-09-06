import { ListPersonsRequestHandler } from '../src/application/list-persons-request-handler';

describe('ListPersonsRequestHandler', () => {
	const listPersons = jest.fn();

	const dynamoDbClient = { listPersons } as any;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should return the list of persons from the dynamoDbClient', async () => {
		const persons = [
			{ personId: '1', firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'Street' },
			{ personId: '2', firstName: 'Jane', lastName: 'Smith', phoneNumber: '456', address: 'Avenue' },
		];
		listPersons.mockResolvedValue(persons);

		const handler = new ListPersonsRequestHandler(dynamoDbClient);
		const result = await handler.handle();

		expect(result).toEqual(persons);
		expect(listPersons).toHaveBeenCalled();
	});

	it('Should return an empty array if no persons are found', async () => {
		listPersons.mockResolvedValue([]);

		const handler = new ListPersonsRequestHandler(dynamoDbClient);
		const result = await handler.handle();

		expect(result).toEqual([]);
		expect(listPersons).toHaveBeenCalled();
	});
});