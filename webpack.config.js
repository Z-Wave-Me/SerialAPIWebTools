const common = require("./webpack.common.js")

module.exports = function(env, argv) {
	return (common(env, argv, './src/controller_ui.ts', 'controller_ui.js', 'ControllerUiLib'));
};