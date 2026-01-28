import fs from 'node:fs/promises';

/**
 * SDK Actions Index を生成
 * @param {string} sdkActionsDirectory
 * @param {Array<{actionName: string, code: string}>} sdkActions
 * @returns {Promise<void>}
 */
export async function publishSdkActionsIndex(sdkActionsDirectory, sdkActions) {
	const sdkActionIndexLines = sdkActions.map(sdkAction => {
		const {actionName} = sdkAction;
		return `export * from './${actionName}/index.js';`;
	});
	const sdkActionIndexCode = sdkActionIndexLines.join('\n') + '\n';
	await fs.writeFile(`${sdkActionsDirectory}/index.js`, sdkActionIndexCode, 'utf8');
}
