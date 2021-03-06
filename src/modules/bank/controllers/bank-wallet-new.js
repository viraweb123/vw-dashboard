


/**
 * @ngdoc controller
 * @name AmdBankWalletNewCtrl
 * @description Create new wallet
 */
mblowfish.controller('AmdBankWalletNewCtrl', function($bank, $navigator, $mbTranslate, $http) {

	this.creatingWallet = false;

	this.cancel = function() {
		$navigator.openPage('/wallets');
	};

	this.currencies = {};
	var ctrl = this;
	$http({
		method: 'GET',
		url: 'resources/currencies.json'
	}).then(function(response) {
		ctrl.currencies = response.data;
	});

	this.add = function(wallet) {
		if (this.creatingWallet) {
			return;
		}
		this.creatingWallet = true;
		var ctrl = this;
		$bank.putWallet(wallet).then(function(/*wallet*/) {
			ctrl.creatingWallet = false;
			$navigator.openPage('/wallets');
		}, function() {
			ctrl.creatingWallet = false;
			alert($mbTranslate.instant('Fail to create new wallet'));
		});
	};
});
