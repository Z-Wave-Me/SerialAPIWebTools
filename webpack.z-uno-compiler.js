const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require("./webpack.common.js")

const template_html = '<script src="/files/z-uno2/Z-Uno-Compiler{{beta}}/z-uno-compiler.js?{{version}}"></script>'

module.exports = function(env, argv) {
	let template_html_replace;
	
	if (common.beta == true)
		template_html_replace = "-beta";
	else
		template_html_replace = "";
	const config = common.common(env, argv, './src/z-uno-compiler.ts', 'z-uno-compiler.js', 'ZUnoCompiler');
	config.plugins.push(
		new HtmlWebpackPlugin({
			inject: false,
			templateContent:template_html.replace(new RegExp("{{beta}}", 'g'), template_html_replace).replace(new RegExp("{{version}}", 'g'), common.web_tools_version),
			filename: 'z-uno-compiler.script',
		}),
	);
	return (config);
};