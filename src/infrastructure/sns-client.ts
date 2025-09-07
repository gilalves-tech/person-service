import { SNSClient as AwsSNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { Person } from "../interfaces/person.interface";
import { EventTypes } from "../enums/event-types";
import { accessEnv } from "../utils/accessEnv";
import { PersonEventPublisher } from "../interfaces/person-event-publisher.interface";

export class SnsClient implements PersonEventPublisher {
	private static instance: SnsClient;
	private client: AwsSNSClient;
	private topicArn: string;

	private constructor() {
		const region = accessEnv("REGION");
		this.topicArn = accessEnv("SNS_TOPIC_ARN");

		this.client = new AwsSNSClient({ region });
	}

	public static getInstance(): SnsClient {
		if (!SnsClient.instance) {
			SnsClient.instance = new SnsClient();
		}
		return SnsClient.instance;
	}

	async publish(eventType: EventTypes, message: Person): Promise<void> {
		const params = {
			TopicArn: this.topicArn,
			Message: JSON.stringify(message),
			MessageAttributes: {
				eventType: {
					DataType: "String",
					StringValue: eventType.valueOf(),
				},
			},
		};

		try {
			await this.client.send(new PublishCommand(params));
			console.log(`✅ Event published to ${this.topicArn}`, params);

		} catch (error) {
			console.error("❌ Failed to publish event", error);
			throw error;
		}
	}
}
