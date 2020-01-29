'use strict';

angular.module('ngMaterialDashboardBank')

/**
 * @ngdoc controller
 * @name AmdBankWalletTransfersCtrl
 * @description Load transfers of a wallet
 * 
 */
.controller('AmdBankWalletTransfersCtrl', function ($scope, $routeParams, $q, $translate, $bank, $navigator, $controller) {

    // Extends with ItemsController
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope: $scope
    }));

    this.walletId = $routeParams.walletId;

    /*
     * Load wallet
     */
    this.loadWallet = function () {
        if(this.wallet){
            return $q.when(this.wallet);
        }
        if (this.loadingWallet) {
            return this.loadingWallet;
        }
        var ctrl = this;
        this.loadingWallet = $bank.getWallet(this.walletId)//
        .then(function (wallet) {
            ctrl.wallet = wallet;
        }, function () {
            alert($translate.instant('Failed to load wallet'));
        })//
        .finally(function () {
            delete ctrl.loadingWallet;
        });
        return this.loadingWallet;
    };

    /*
     * Overried the function
     */
    this.getModelSchema = function () {
        var ctrl = this;
        return this.loadWallet()//
        .then(function () {
            return ctrl.wallet.transferSchema();
        });
    };

    // get wallets
    this.getModels = function (parameterQuery) {
        var ctrl = this;
        return this.loadWallet()//
        .then(function () {
            return ctrl.wallet.getTransfers(parameterQuery);
        });
    };

    this.init({
        eventType: '/bank/transfers'
    });
});
