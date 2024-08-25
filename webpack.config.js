const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require("./webpack.common.js")

const template_html = '<input type="button" onclick="connectToZMESerial()" value="Start">\n' +
'<link rel="stylesheet" type="text/css" href="/files/SerialAPIWebTools{{beta}}/main.css?{{version}}">\n' +
'<script src="/files/SerialAPIWebTools{{beta}}/controller_ui.js?{{version}}"></script>\n' +
'<script>\n' +
'	async function connectToZMESerial() {\n' +
'		const test = new ControllerUiLib.ControllerUiClass(document.getElementsByTagName(\'body\')[0x0]);\n' +
'	}\n' +
'</script>\n';

module.exports = function(env, argv) {
	let template_html_replace;
	
	if (common.beta == true)
		template_html_replace = "-beta";
	else
		template_html_replace = "";
	const config = common.common(env, argv, './src/controller_ui.ts', 'controller_ui.js', 'ControllerUiLib');
	config.plugins.push(
		new HtmlWebpackPlugin({
			inject: false,
			templateContent:template_html.replace(new RegExp("{{beta}}", 'g'), template_html_replace).replace(new RegExp("{{version}}", 'g'), common.web_tools_version),
			filename: 'controller_ui.html',
		}),
	);
	return (config);
};