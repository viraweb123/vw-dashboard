

module.exports = function(config) {
	'use strict';

	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		// as well as any additional frameworks (requirejs/chai/sinon/...)
		frameworks: [
			'jasmine'
		],

		detectBrowsers: {
			enabled: true,
			usePhantomJS: false,
			preferHeadless: true
		},

		// list of files / patterns to load in the browser
		files: [
			// bower:js
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/lodash/lodash.js',
			'bower_components/mustache.js/mustache.js',
			'bower_components/seen-core/dist/seen-core.js',
			'bower_components/seen-bank/dist/seen-bank.js',
			'bower_components/seen-user/dist/seen-user.js',
			'bower_components/seen-tenant/dist/seen-tenant.js',
			'bower_components/seen-supertenant/dist/seen-supertenant.js',
			'bower_components/seen-cms/dist/seen-cms.js',
			'bower_components/seen-monitor/dist/seen-monitor.js',
			'bower_components/seen-shop/dist/seen-shop.js',
			'bower_components/seen-sdp/dist/seen-sdp.js',
			'bower_components/seen-seo/dist/seen-seo.js',
			'bower_components/angular-recaptcha/release/angular-recaptcha.js',
			'bower_components/blob-polyfill/Blob.js',
			'bower_components/file-saver.js/FileSaver.js',
			'bower_components/angular-file-saver/dist/angular-file-saver.bundle.js',
			'bower_components/flux/dist/Flux.js',
			'bower_components/moment/moment.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-messages/angular-messages.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-aria/angular-aria.js',
			'bower_components/angular-material/angular-material.js',
			'bower_components/golden-layout/dist/goldenlayout.min.js',
			'bower_components/ng-appcache/dist/appcache.js',
			'bower_components/angular-material-persian-datepicker/dist/datePicker.min.js',
			'bower_components/mblowfish-core/dist/mblowfish-core.js',
			'bower_components/angular-mocks/angular-mocks.js',
			// endbower
			'app/scripts/app.js',
			'app/scripts/**/index.js',
			'app/scripts/**/*.js',
			'test/mock/**/*.js',
			'test/spec/**/*.js'
		],

		// list of files / patterns to exclude
		exclude: [
		],

		// web server port
		port: 8080,

		// coverage reporter generates the coverage
		reporters: [
			'progress',
		],

		preprocessors: {
		},

		// Which plugins to enable
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
		],

		singleRun: false,
		colors: true,
		logLevel: config.LOG_INFO
	});
};
