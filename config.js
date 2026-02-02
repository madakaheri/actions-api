
/**
 * SDKビルド設定
 * @type {{srcPath: string, outPath: string, serviceFunctionName?: string}}
 */
export const sdkConfig = {
	srcPath: new URL('test-repo/api/src/actions', import.meta.url).pathname,
	outPath: new URL('test-repo/sdk/src/actions', import.meta.url).pathname,
	// serviceFunctionName: 'lambda-function-name',
};

/**
 * @deprecated sdkConfig.srcPathへ移行
 * APIのアクションディレクトリパス
 * @type {string}
 */
export const apiActionsDirectory = new URL('test-repo/api/src/actions', import.meta.url).pathname;

/**
 * @deprecated sdkConfig.outPathへ移行
 * 自動更新するSDKのアクションディレクトリパス
 * @type {string}
 */
export const sdkActionsDirectory = new URL('test-repo/sdk/src/actions', import.meta.url).pathname;

/**
 * @deprecated sdkConfig.serviceFunctionNameへ移行
 * サービスのLambda関数名
 * @type {string | undefined}
 */
export const serviceFunctionName = 'test-function';
