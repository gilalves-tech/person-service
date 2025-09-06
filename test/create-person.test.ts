import { handler } from "../src/handlers/create-person";
import { CreatePersonRequestHandler } from "../src/application/create-person-request-handler";
import { APIGatewayProxyEventV2, Callback, Context } from "aws-lambda";
import { Person } from "src/interfaces/person.interface";
import { PersonCreateRequest } from "src/interfaces/person-create-request.interface";

jest.mock("../src/infrastructure/dynamo-db-client", () => ({
	DynamoDbClient: { getInstance: jest.fn(() => ({})) },
}));
jest.mock("../src/infrastructure/sns-client", () => ({
	SnsClient: { getInstance: jest.fn(() => ({})) },
}));

jest.mock("../src/application/create-person-request-handler");

const MockedCreatePersonRequestHandler = CreatePersonRequestHandler as jest.MockedClass<
	typeof CreatePersonRequestHandler
>;

const dummyContext = {} as Context;
const dummyCallback = (() => {}) as Callback;

describe("Lambda handler", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Should return 400 if request body is missing", async () => {
		const event = { body: undefined } as APIGatewayProxyEventV2;

		const response = await handler(event, dummyContext, dummyCallback) as any;

		expect(response.statusCode).toBe(400);
		expect(JSON.parse(response.body)).toEqual({ message: "Missing request body" });
	});

	it("Should return 201 and created person when successful", async () => {
		const fakePerson: PersonCreateRequest = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "123-456-7890",
			address: "123 Main St"
		};

		MockedCreatePersonRequestHandler.prototype.handle.mockResolvedValueOnce({
			...fakePerson,
			personId: "dummy-id"
		});

		const event = {
			body: JSON.stringify(fakePerson),
		} as APIGatewayProxyEventV2;

		const response = await handler(event, dummyContext, dummyCallback) as any;

		expect(response.statusCode).toBe(201);
		expect(JSON.parse(response.body)).toEqual({
			...fakePerson,
			personId: "dummy-id"
		});
		expect(MockedCreatePersonRequestHandler.prototype.handle).toHaveBeenCalledWith(fakePerson);
	});

	it("Should return 500 if an error occurs", async () => {
		MockedCreatePersonRequestHandler.prototype.handle.mockRejectedValueOnce(
			new Error("DB error")
		);

		const event = {
			body: JSON.stringify({ name: "Jane Doe" }),
		} as APIGatewayProxyEventV2;

		const response = await handler(event, dummyContext, dummyCallback) as any;

		expect(response.statusCode).toBe(500);
		expect(JSON.parse(response.body)).toEqual({ message: "Internal server error" });
	});
});
