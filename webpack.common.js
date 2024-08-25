const package = require("./package.json")
const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function version_str_to_int(version) {
	let i, out;
	const version_list = version.split(".");
	i = version_list.length;
	out = 0x0;
	while (i != 0x0) {
		out = out | (Number(version_list[i - 0x1]) << (0x8 * (version_list.length - i)));
		i--;
	}
	return (out);
}

function version_int_to_str(version, min) {
	let out, i;
	const list = [];
	while (version != 0x0) {
		list.unshift(version & 0xFF);
		version = version >> 0x8;
	}
	while (list.length < min) {
		list.unshift(0x0);
	}
	out = "";
	i = 0x0;
	while (true) {
		out = out + String(list[i]).padStart(2, '0');
		i++;
		if (i < list.length) {
			out = out + ".";
			continue;
		}
		break;
	}
	return (out);
}

module.exports = function(env, argv, entry_patch, out_filename, library_name) {
	const web_tools_version = version_int_to_str(version_str_to_int(package.version), 0x3);
	const tester_plugin_options =
	{
		terserOptions: { format: {comments: false,},},
		extractComments: false
	};
	const tester_plugin = new TerserPlugin(tester_plugin_options);
	const optimization =
	{
		minimize: true,
		minimizer: [tester_plugin],
	};
	const config =
	{
		plugins: [
			new MiniCssExtractPlugin(),
			new webpack.DefinePlugin({
				WEB_TOOLS_VERSION: JSON.stringify(web_tools_version),
			})
		],
		entry: entry_patch,
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
			filename: out_filename,
			libraryTarget: 'umd',
			library: library_name,
			path: path.resolve(__dirname, 'build')
		}
	};
	if (argv.mode == "development")
		config["devtool"] = 'source-map';
	else {
		config["devtool"] = false;
		config["optimization"] = optimization;
	}
	return (config);
};