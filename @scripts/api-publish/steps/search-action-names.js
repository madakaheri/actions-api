import fs from 'node:fs/promises';

/**
 * Action名の一覧を取得
 * @param {string} apiActionsDirectory
 * @returns {Promise<string[]>}
 */
export async function searchActionNames(apiActionsDirectory) {
	const dirrents = await fs.readdir(apiActionsDirectory, {
		withFileTypes: true,
		recursive: false,
	});
	return dirrents
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);
}
