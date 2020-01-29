'use strict';

angular.module('ngMaterialDashboardShop')

/**
 * @ngdoc Controller
 * @name AmdShopServiceCtrl
 * @description Controller of a service
 */
.controller('AmdShopServiceCtrl', function (
        $scope, $routeParams, $translate, $location, $navigator, $q, 
        /* wb-core   */ $resource,
        /* seen-core */ QueryParameter,
        /* seen-shop */ $shop, ShopService, ShopCategory, ServiceMetafield) {

    this.loading = false;
    this.updating = false;
    this.edit = false;
    this.loadingMetas = false;
    this.loadingCategories = false;
    var ctrl = this;

    /**
     * @name loadService
     * @memberOf AmdShopServiceCtrl
     * @description Load the selected service
     */
    function loadService() {
        if (ctrl.loading) {
            return;
        }
        ctrl.loading = true;
        $shop.getService($routeParams.serviceId,{
            graphql: '{id,title,description,price,off,avatar,categories{id,name,description,thumbnail}, metafields{id,key,value,unit,namespace}}'
        })//
        .then(function (p) {
            loadMetafields(p.metafields);
            loadCategories(p.categories);
            delete p.metafields;
            delete p.categories;
            $scope.service = new ShopService(p);
        }, function () {
            alert($translate.instant('Faild to load the service.'));
        })//
        .finally(function () {
            ctrl.loading = false;
        });
    }

    /**
     * @name remove
     * @memberOf AmdShopServiceCtrl
     * @description remove the selected service from the server
     */
    function remove() {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.service.delete()//
            .then(function () {
                $location.path('/services/');
            }, function () {
                alert($translate.instant('Fail to delete the service.'));
            });
        });
    }

    /**
     * @name update
     * @memberOf AmdShopServiceCtrl
     * @description Update the selected service
     */
    function update() {
        if (ctrl.loading) {
            return ctrl.loading;
        }
        ctrl.loading = $scope.service.update()//
        .then(function (newService) {
            $scope.service = newService;
        }, function () {
            alert($translate.instant('Failed to update service.'));
        })//
        .finally(function () {
            ctrl.loading = false;
        });
        return ctrl.loading;
    }

    /**
     * @name loadMetas
     * @memberOf AmdShopProductCtrl
     * @description Load the metadatas of the service
     */
    function loadMetafields(list) {
        var metaFields = [];
        _.forEach(list, function(item){
            metaFields.push(new ServiceMetafield(item));
        });
        $scope.metafeilds = metaFields;
    }

    /*
     * Load categories the service belongs to.
     */
    function loadCategories(list) {
        var categories = [];
        _.forEach(list, function(item){
            categories.push(new ShopCategory(item));
        });
        $scope.categories = categories;
    }

    /**
     * @name removeMetaField
     * @memberOf AmdShopProductCtrl
     * @description Remove a metadata from the metadatas of the service
     * @param {type}
     *            metaData
     */
    function removeMetafield(metaData) {
        confirm($translate.instant('Item will be deleted. There is no undo action.'))//
        .then(function () {
            return $scope.service.deleteMetafield(metaData)//
            .then(function () {
                loadMetafields();
                toast($translate.instant('Item is deleted successfully.'));
            }, function () {
                alert($translate.instant('Failed to delete item.'));
            });
        });
    }

    function addMetafield(metadata) {
        var mydata = metadata ? metadata : {};
        $navigator.openDialog({
            templateUrl: 'views/dialogs/metafield-new.html',
            config: {
                data: mydata
            }
        // Create content
        }).then(function (meta) {
            return $scope.service.putMetafield(meta)//
            .then(function () {
                loadMetafields();
            }, function () {
                alert($translate.instant('Failed to add new item.'));
            });
        });
    }

    function updateMetafield(metadata) {
        $navigator.openDialog({
            templateUrl: 'views/dialogs/metafield-update.html',
            config: {
                data: metadata
            }
        // Create content
        }).then(function (meta) {
            return $scope.service.putMetafield(meta)//
            .then(function () {
                loadMetafields();
            }, function () {
                alert($translate.instant('Failed to update item.'));
            });
        });
    }

    function inlineUpdateMetafield(metadata) {
        return $scope.service.putMetafield(metadata)//
        .then(function () {
            loadMetafields();
        }, function () {
            alert($translate.instant('Failed to update item.'));
        });
    }

    /*
     * Assign some categories to the service.
     */
    function selectCategories() {
        $resource.get('/shop/categories', {
            // TODO: maso, 2020: add initial resources
        })
        .then(function (newCats) {
            addCategories(newCats);
        });
    }

    /*
     * @param {type} cats
     * @returns {undefined}
     * @description Push the service's categories to the server
     */
    function addCategories(cats) {
        $scope.updatingCategories = true;
        var jobs = [];
        _.forEach(cats, function(item) {
            jobs.push($scope.service.putCategory(item)
                    .then(function(){
                        $scope.categories.push(item);
                    }));
        });
        return $q.all(jobs)
        .finally(function () {
            $scope.updatingCategories = false;
        });
    }

    this.removeCategories = function() {
        $scope.updatingCategories = true;
        var jobs = [];
        _.forEach(arguments, function(item) {
            jobs.push($scope.service.deleteCategory(item)
                    .then(function(){
                        _.remove($scope.categories, function(currentObject) {
                            return currentObject.id === item.id;
                        });
                    }));
        });
        return $q.all(jobs)
        .finally(function () {
            $scope.updatingCategories = false;
        });
    }


    /*
     * تمام امکاناتی که در لایه نمایش ارائه می‌شود در اینجا نام گذاری شده است.
     */
    $scope.remove = remove;
    $scope.update = update;
    $scope.removeMetafield = removeMetafield;
    $scope.addMetafield = addMetafield;
    $scope.updateMetafield = updateMetafield;
    $scope.inlineUpdateMetafield = inlineUpdateMetafield;
    $scope.selectCategories = selectCategories;

    loadService();
});

