const common = require("./webpack.common.js")

module.exports = function(env, argv) {
	return (common.common(env, argv, './src/z-uno-compiler.ts', 'z-uno-compiler.js', 'ZUnoCompiler'));
};