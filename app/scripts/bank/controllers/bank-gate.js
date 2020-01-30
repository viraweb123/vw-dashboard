'use strict';

angular.module('ngMaterialDashboardBank')

/**
 * @ngdoc controller
 * @name AmdBankGates
 * @description Manages bank backends
 * 
 */
.controller('AmdBankGateCtrl', function ($scope, $bank, $location, $routeParams, $navigator, $translate) {

    var ctrl = {
            state: 'relax',
            edit: false
    }
    /**
     * درخواست مورد نظر را از سیستم حذف می‌کند.
     * 
     * @param request
     * @returns
     */
    function remove() {
        confirm($translate.instant('The bank gate will be deleted.'))//
        .then(function () {
            $scope.gate.delete()
            .then(function () {
                $location.path('/bank/gates');
            }, function () {
                alert($translate.instant('Fail to delete bank gate'));
            });
        });
    }

    function load() {
        if (ctrl.state !== 'relax') {
            return;
        }
        ctrl.state = 'working';
        return $bank.getBackend($routeParams.gateId)//
        .then(function (gate) {
            $scope.gate = gate;
            return $scope.gate;
        })
        .finally(function () {
            ctrl.state = 'relax';
        });
    }

    function update() {
        if (ctrl.state !== 'relax') {
            return;
        }
        ctrl.state = 'working';
        return $scope.gate.update()//
        .then(function (gate) {
            $scope.gate = gate;
            ctrl.edit = false;
            return $scope.gate;
        })
        .finally(function () {
            ctrl.state = 'relax';
        });
    }

    $scope.remove = remove;
    $scope.load = load;
    $scope.update = update;
    $scope.ctrl = ctrl;
    load();

});
