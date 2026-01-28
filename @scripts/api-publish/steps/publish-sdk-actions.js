import fs from 'node:fs/promises';

/**
 * SDK Actions を削除して再生成
 * @param {string} sdkActionsDirectory
 * @param {Array<{actionName: string, code: string}>} sdkActions
 * @returns {Promise<void>}
 */
export async function publishSdkActions(sdkActionsDirectory, sdkActions) {
	// SDK Actions ディレクトリを削除して再生成
	await fs.rm(`${sdkActionsDirectory}`, {recursive: true}).catch(() => {}); // eslint-disable-line promise/prefer-await-to-then
	await fs.mkdir(`${sdkActionsDirectory}`, {recursive: true});

	// SDK Actions 群を生成
	await Promise.all(sdkActions.map(async sdkAction => {
		const {actionName, code} = sdkAction;
		const directoryPath = `${sdkActionsDirectory}/${actionName}`;
		await fs.mkdir(directoryPath, {recursive: true});
		const filePath = `${directoryPath}/index.js`;
		await fs.writeFile(filePath, code, 'utf8');
	}));
}
