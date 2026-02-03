import fs from 'node:fs/promises';

/**
 * APIディレクトリを生成します。
 * @param {Object} params
 * @param {ActionApiType} params.actionApiType
 * @param {string} params.rootPath
 * @returns {Promise<void>}
 */
export async function apiInit({actionApiType, rootPath}) {
	// 1. rootPath に api ディレクトリがあれば Abort

	// 2. ディレクトリ作成
	const srcPath = `${rootPath}/src/`;
	await fs.mkdir(srcPath, {recursive: true});

	// 3. テンプレートをコピー
	const templateDirectory = new URL(`templates/${actionApiType}/`, import.meta.url).pathname;
}
