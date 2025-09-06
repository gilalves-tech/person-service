import { Node } from "constructs";
import { IConfig } from "../config/config.interface";
import { Environment } from "../enums/environments.enum";
import { ConfigDev } from "../config/config.dev";

export class ConfigFactory {
	public static createConfig(target: Node): IConfig {
		const env = target.tryGetContext("env") as Environment ?? Environment.DEV;

		switch (env) {
			case Environment.DEV:
				return new ConfigDev();
			// Add other environments here (e.g., PRD)
			default:
				throw new Error(`Environment is undefined.`);
		}
	}
}
