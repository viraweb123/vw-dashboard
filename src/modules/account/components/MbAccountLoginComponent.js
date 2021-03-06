
import templateUrl from './MbAccountLoginComponent.html';

export default {
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	controller: function(
	/* Angularjs */ $scope, $mbTranslate, $usr,
	/* MBlowfish */ $mbAccount, $mbLog) {
		'ngInject';


		// support old systems
		var ctrl = this;


		/**
		 Call login process for current user
		 
		 @memberof MbAccountContainerCtrl
		 @name login
		 @param {object} cridet Username, password, token and others required in login
		 @param {string} cridet.login Login name of the user
		 @param {stirng} cridet.password Password ot the user
		 @param {stirng} cridet.token Token to use in the login
		 @param {stirng} cridet.captcha captcah to send
		 @returns {promiss} TO do the login
		 */
		function login(cridet) {
			if (ctrl.isProcessingLogin) {
				return false;
			}
			return (ctrl.isProcessingLogin = $mbAccount.login(cridet)
				.catch(function(/*error*/) {
					// TODO: maso, 2020: chanage state to error
				})
				.finally(function() {
					delete ctrl.isProcessingLogin;
				}));
		}

		function logout() {
			if (ctrl.isProcessingLogout) {
				return false;
			}
			return (ctrl.isProcessingLogout = $mbAccount.logout()//
				.catch(function(/*error*/) {
					// TODO: maso, 2020: chanage state to error
				})
				.finally(function() {
					delete ctrl.isProcessingLogout;
				}));
		}

		/**
		 Creates a new request to recover password
		 
		 @name load
		 @memberof MbAccountCtrl
		 @returns {promiss} to change password
		 */
		function recoverPasswrodRequest(data, form) {
			if (ctrl.changingPassword) {
				return;
			}
			ctrl.changingPassword = true;
			var param = {
				'old': data.oldPass,
				'new': data.newPass,
				'password': data.newPass
			};
			// return $usr.resetPassword(param)//
			$usr.putCredential(param)
				.then(function() {
					$mbAccount.logout();
					ctrl.changePassState = 'success';
					$scope.changePassMessage = null;
					toast($mbTranslate.instant('Password is changed successfully. Login with new password.'));
				}, function(error) {
					ctrl.changePassState = 'fail';
					$scope.changePassMessage = $mbLog.error(error, form);
					alert($mbTranslate.instant('Failed to change the password.'));
				})//
				.finally(function() {
					ctrl.changingPassword = false;
				});
		}


		//-----------------------------------------------------------------
		// END
		//-----------------------------------------------------------------
		$scope.credit = {};
		_.assign(ctrl, {
			login: login,
			logout: logout,
			recoverPasswrodRequest: recoverPasswrodRequest,
		});
	}
}