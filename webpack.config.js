const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(env, argv) {
	const config =
	{
		plugins: [new MiniCssExtractPlugin()],
		entry: './src/controller_ui.ts',
		module: 
		{
			rules:
			[
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.html$/i,
					loader: "html-loader",
				},
				{
					test: /\.scss$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				},
			],
		},
		resolve:
		{
			extensions: ['.tsx', '.ts', '.js'],
		},
		output:
		{
			filename: 'controller_ui.js',
			libraryTarget: 'umd',
			library: 'ControllerUiLib',
			path: path.resolve(__dirname, 'build')
		}
	};
	if (argv.mode == "development")
		config["devtool"] = 'source-map';
	else
		config["devtool"] = false;
	return (config);
};