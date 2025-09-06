import { PersonRepository } from 'src/interfaces/person-repository.interface';
import { CreatePersonRequestHandler } from '../src/application/create-person-request-handler';
import { EventType } from '../src/enums/event-type.enum';
import { PersonEventPublisher } from '../src/interfaces/person-event-publisher.interface';

jest.mock('uuid', () => ({
	v4: () => 'test-uuid',
}));

describe('CreatePersonRequestHandler', () => {
	const putPerson = jest.fn().mockResolvedValue(undefined);
	const publish = jest.fn().mockResolvedValue(undefined);

	const dynamoDbClient: PersonRepository = {
		listPersons: jest.fn(),
		putPerson,
	};

	const snsClient: PersonEventPublisher = {
		publish,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should create a person, store it, publish event, and return the person', async () => {
		const handler = new CreatePersonRequestHandler(dynamoDbClient, snsClient);
		const request = {
			firstName: 'John',
			lastName: 'Doe',
			phoneNumber: '123',
			address: 'Street',
		};

		const result = await handler.handle(request);

		expect(result).toEqual({
			personId: 'test-uuid',
			...request,
		});

		expect(putPerson).toHaveBeenCalledWith(result);
		expect(publish).toHaveBeenCalledWith(EventType.PERSON_CREATED, result);
	});
});