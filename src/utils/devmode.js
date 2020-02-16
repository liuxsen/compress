/**
 * 返回是否是开发模式
 */
const isDevMode = () => !!process.defaultApp;

exports.isDevMode = isDevMode;