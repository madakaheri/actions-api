import fs from 'node:fs/promises';

/**
 * 設定ファイルを読み込みます。
 * @param {string} projectPath プロジェクトのルートパス
 * @returns {Promise<{actionApiType: ActionApiType, apiPath: string, sdkConfig: {rootPath: string, srcPath: string, outPath: string}}>}
 */
export async function loadConfig(projectPath) {
	const packageJsonPath = `${projectPath}package.json`;
	const rawPackage = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
	const config = rawPackage['actions-api'];
	console.log(config);
	return {
		actionApiType: config.actionApiType,
		apiPath: config.apiPath,
		sdkConfig: {
			rootPath: config.sdkConfig.rootPath,
			srcPath: config.sdkConfig.srcPath,
			outPath: config.sdkConfig.outPath,
		},
	};
}
