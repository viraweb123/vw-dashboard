
import templateUrl from './accountPage.html';

export default {
	title: 'Account',
	description: 'Account information is used to identicate an account.',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function($wizard) {
		'ngInject';

		function createSetterGetter(key) {
			return function(date) {
				if (_.isUndefined(date)) {
					return $wizard.getData(key);
				}
				$wizard.setData(key, date);
			};
		}

		this.login = createSetterGetter('login');
		this.email = createSetterGetter('email');
		this.phone = createSetterGetter('phone');
		this.is_active = createSetterGetter('is_active');
	},
	isPageComplete: function($wizard) {
		'ngInject';
		// TODO: check if the login exist
		return $wizard.data.login;
	}
}