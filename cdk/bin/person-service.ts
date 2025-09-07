#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { PersonServiceStack } from '../lib/person-service-stack';
import { ConfigFactory } from '../config/config-factory';
import { IConfig } from '../config/config.interface';

const app = new App();
const config: IConfig = ConfigFactory.createConfig(app.node);

new PersonServiceStack(
	app, config.stackName, config, {
	env: {
		account: config.accountId,
		region: config.region
	},
});