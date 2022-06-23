# Dependency Extraction Webpack Plugin

Extends Wordpress [Dependency Extraction Webpack Plugin](https://github.com/WordPress/gutenberg/tree/master/packages/dependency-extraction-webpack-plugin) to automatically include WazFrame dependencies in addition to WordPress dependencies.

This implementation is an adaptation of [WooCommerce's Implementation](https://github.com/woocommerce/woocommerce-admin/tree/main/packages/dependency-extraction-webpack-plugin) of the same webpack utility function. By default, registering your own custom Dependency Extraction extension in a `webpack.config.js` file
overrides the default WordPress one, because you can only have a single instance of `DependencyExtractionWebpackPlugin`. 

That means, by default you can either have your own list of dependencies or WordPress's, but not both. This plugin solves that.

## Installation

Install the module

```
npm install @wazframe/dependency-extraction-webpack-plugin --save-dev
```

## Usage

Use this as you would [Dependency Extraction Webpack Plugin](https://github.com/WordPress/gutenberg/tree/master/packages/dependency-extraction-webpack-plugin). The API is exactly the same, except that WazFrame packages are also handled automatically.

```js
// webpack.config.js
const WazFrameDependencyExtractionWebpackPlugin = require( '@wazframe/dependency-extraction-webpack-plugin' );

module.exports = {
	// ...defaultConfig
	plugins: [ new WazFrameDependencyExtractionWebpackPlugin() ],
};
```
