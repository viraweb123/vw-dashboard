/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/***********************************************************************************
 * Configuration
 **********************************************************************************/
mblowfish
	.addConstants({
		APP_KEY: 'vwstudio',
	});

mblowfish
	.config(function(
		$mbApplicationProvider, $mbLayoutProvider, $mbToolbarProvider, $mbActionsProvider,
		//		$mbSidenavProvider,
		$mbAccountProvider,
		$mbTranslateSanitizationProvider, $mbTranslateProvider,
		$mbStorageProvider, $locationProvider) {


		//
		// $mbAction: manages all actions
		//
		$mbActionsProvider
			.setShortkeysEnabled(true);

		$mbAccountProvider
			.addAuthenticationProvider('AmdUserAtuthenticationProvider');

		// Translation 
		$mbTranslateProvider
			.useMissingTranslationHandlerLog()
			//.useMissingTranslationHandler('$mbTranslateMissingTranslationHandlerStorage')
			.useStaticFilesLoader({
				files: [{
					prefix: '/api/v2/cms/contents/local-language-',
					suffix: '/content'
				}]
			})
			.fallbackLanguage(['en', 'fa'])
			.preferredLanguage('en');
		$mbTranslateSanitizationProvider
			.useStrategy(['sanitizeParameters']);

		//
		// Application ID
		//
		// Application ID is used to seperate applications from each other. for
		// example you may have studo and dashboard application.
		//
		$mbApplicationProvider
			.setKey(APP_KEY)
			.setPreloadingEnabled(true)
			.setAccountDetailRequired(true)
			.setSettingsRequired(true)
			.setLogingRequired(true)
			.setLoginComponent({
				templateUrl: 'scripts/module-account/controllers/account-container-login-page.html',
				controller: 'MbAccountContainerCtrl',
				controllerAs: 'ctrl'
			})
			.addAction('init', {
				title: 'Loading Tenant Settings',
				/* @ngInject */
				action: function($mbTenant) {
					return $mbTenant.reload();
				}
			});

		//
		// Application storage prefix
		//
		//  All data will be stored in local storage with key. This will be
		// added to all keys. So you can run several application which is 
		// designed based on MB
		$mbStorageProvider.setKeyPrefix(APP_KEY + '.');

		//
		// HTML5 Addess style
		//
		// Enables HTML5 addresss style. SO the #! sign will be removed from
		// the path.
		$locationProvider.html5Mode(true);

		//
		//  $mbLayout: manages layouts of the system. It is used as a basic layout
		// system to manage views, editors and etc. You are free to add layouts dynamically
		// at runtime.
		//
		$mbLayoutProvider
			.addProvider('MbLayoutsLayoutProviderLocal')
			.addProvider('VwLayoutProviderDefault')
			.setDefalutLayout('default');

		//
		//  By initializing the main toolbar you can add list of action or component
		// into the toolbar.
		//
		$mbToolbarProvider.init([{
			url: '/dashboard',
			items: [
				MB_NAVIGATOR_SIDENAV_TOGGLE_ACTION
			]
		}, {
			url: '/cms',
			items: []
		}, {
			url: '/user/account',
			float: 'right',
			items: [
				AMD_ACCOUNT_MESSAGES_COMPONENT,
				AMD_ACCOUNT_TOOLBAR_COMPONENT
			]
		}, {
			url: '/user/notifications',
			float: 'right',
			items: [
				MB_LAYOUTS_TOOLBAR_COMPONENT,
				AMD_ACCOUNT_CHAT_ACTION
			]
		}]);
	})


	/***********************************************************************************
	 * Configuration
	 **********************************************************************************/
	.run(function($window) {

		//  Load application
		$window.$crisp = [];
		$window.CRISP_WEBSITE_ID = '55019c32-37d1-46ab-b97e-1b524309deb1';
		$window.loadLibrary('https://client.crisp.chat/l.js');
	})
	;


/***********************************************************************************
 * Custom application loading
 **********************************************************************************/
$(window).on('load', function() {
	mblowfish
		.loadModules(APP_KEY)
		.then(function() {
			try {
				mblowfish.bootstrap(document.documentElement, [
					//	load legecy angular modules
					'seen-core',
					'seen-user',
					'seen-tenant',
					'seen-supertenant',
					'seen-cms',
					'seen-monitor',
					'seen-shop',
					'seen-seo',

					'vcRecaptcha', //https://github.com/VividCortex/angular-recaptcha
					'ngFileSaver',//
				]);
			} catch (error) {
				console.log(error);
			}
		});
});




