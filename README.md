To run this locally:
	1. Install Node v8.9.4 or higher
	2. npm i
	3. npm run start
	4. The app runs on 0.0.0.0:8000

Packages installed:
* @babel/core (The most core modules of babel)
* @babel/preset-env (Includes upcoming language features with Babel)
* @babel/preset-react (For transpiling JSX)
* @babel/plugin-proposal-class-properties (Support for the experimental syntax 'classProperties')
* @babel/plugin-transform-runtime (Seems to solve the error when using async)
* @babel/runtime (Required for classes and works with @babel/plugin-transform-runtime)
* babel-loader (Used by Webpack to transpile code)
* webpack & webpack-cli (Bundling tool)
* html-webpack-plugin html-loader (Enable Webpack to add an html file to the dist folder)
* webpack-dev-server (Dev server which updates after saving changes)
* react-proxy-loader (to comply with CORS)
* moment (Convert time formats)