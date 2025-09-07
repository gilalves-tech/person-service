import { Node } from "constructs";
import { IConfig } from "./config.interface";
import { Environments } from "../enums/environments";
import { ConfigDev } from "./config.dev";

export class ConfigFactory {
	public static createConfig(target: Node): IConfig {
		const env = target.tryGetContext("env") as Environments ?? Environments.DEV;

		switch (env) {
			case Environments.DEV:
				return new ConfigDev();
			// Add other environments here (e.g., PRD)
			default:
				throw new Error(`Environment is undefined.`);
		}
	}
}
