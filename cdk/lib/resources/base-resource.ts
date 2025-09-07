import { Construct } from "constructs";
import { IConfig } from "../../config/config.interface";

export abstract class BaseResource extends Construct {
	constructor(scope: Construct, id: string, protected readonly config: IConfig) {
		super(scope, id);
	}
}
