import {searchActionNames} from './steps/search-action-names.js';
import {extractFunctionParts} from './steps/extract-function-parts.js';
import {makeSdkCode} from './steps/make-sdk-code.js';
import {publishSdkActions} from './steps/publish-sdk-actions.js';
import {publishSdkActionsIndex} from './steps/publish-sdk-actions-index.js';

const lambdaFunctionName = 'myLambdaFunction';

/**
 * API Actions から SDK Actions を生成して既存の SDK Actions を更新します。
 * @param {Object} params
 * @param {string} params.apiActionsDirectory
 * @param {string} params.sdkActionsDirectory
 * @returns {Promise<void>}
 */
export async function apiPublish({apiActionsDirectory, sdkActionsDirectory}) {
	// API Actions 群を解析して SDK Actions コードを生成
	const actionNames = await searchActionNames(apiActionsDirectory);
	const sdkActions = await Promise.all(actionNames.map(async actionName => {
		const {docComment, inputName} = await extractFunctionParts(apiActionsDirectory, actionName);
		const code = await makeSdkCode({
			docComment,
			actionName,
			inputName,
			lambdaFunctionName,
		});
		return {
			actionName,
			code,
		};
	}));
	await publishSdkActions(sdkActionsDirectory, sdkActions);
	await publishSdkActionsIndex(sdkActionsDirectory, sdkActions);
}
