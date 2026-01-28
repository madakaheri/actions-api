import process from 'node:process';
import {apiActionsDirectory, sdkActionsDirectory} from '../config.js';

const [_node, _file, command, ...options] = process.argv;

const info = `
---------------------------------------

Actions API Scripts

---------------------------------------


Usage: node @scripts/main.js <command>

Commands:
	api-publish        Generate SDK Actions from API Actions and update existing SDK
`;

switch (command) {
	case 'api-publish': {
		const {apiPublish} = await import('./api-publish/index.js');
		await apiPublish({apiActionsDirectory, sdkActionsDirectory});
		console.info('✅ SDK Actions have been published successfully!');
		break;
	}

	default: {
		console.info(info);
	}
}
