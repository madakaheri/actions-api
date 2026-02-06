import process from 'node:process';
import {loadConfig} from './utils/load-config.js';

const [_node, _file, command, ..._options] = process.argv;
const projectPath = new URL('../', import.meta.url).pathname;
const {actionApiType, apiPath, sdkConfig} = await loadConfig(projectPath);
const info = `
---------------------------------------

Actions API Scripts

---------------------------------------


Usage: node src/main.js <command>

Commands:
	init               Initialize both API and SDK directories
	api-init           Initialize API directory
	sdk-init           Initialize SDK directory
	sdk-update         Generate SDK Actions from API Actions and update existing SDK
`;

switch (command) {
	case 'init': {
		const {apiInit} = await import('./actions/api-init/index.js');
		await apiInit({
			actionApiType,
			rootPath: apiPath,
		});
		const {sdkInit} = await import('./actions/sdk-init/index.js');
		await sdkInit({
			actionApiType,
			rootPath: sdkConfig.rootPath,
		});
		break;
	}

	case 'api-init': {
		const {apiInit} = await import('./actions/api-init/index.js');
		await apiInit({
			actionApiType,
			rootPath: apiPath,
		});
		break;
	}

	case 'sdk-init': {
		const {sdkInit} = await import('./actions/sdk-init/index.js');
		await sdkInit({
			actionApiType,
			rootPath: sdkConfig.rootPath,
		});
		break;
	}

	case 'sdk-update': {
		const {sdkUpdate} = await import('./actions/sdk-update/index.js');
		await sdkUpdate({
			srcPath: sdkConfig.srcPath,
			outPath: sdkConfig.outPath,
		});
		break;
	}

	default: {
		console.info(info);
	}
}
