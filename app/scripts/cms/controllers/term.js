'use strict';

angular.module('ngMaterialDashboardCms')

	/**
	 * @ngdoc function
	 * @name ngMaterialDashboardCms.controller:AmdCmsTermCtrl
	 * @description # TermCtrl Controller of the ngMaterialDashboardCms
	 */
	.controller('AmdCmsTermCtrl', function ($navigator, $cms, $translate, $routeParams, $location, QueryParameter) {

	    this.loadingTerm = true;
	    this.savingTerm = false;
	    this.edit = false;
	    this.term = null;


	    function handlError() {
		alert($translate.instant('Failed to load items'));
	    }

	    /*
	     * Load the term
	     */
	    this.loadTerm = function () {
		var ctrl = this;
		this.loadingTerm = true;
		$cms.getTerm($routeParams.termId)//
			.then(function (term) {
			    ctrl.term = term;
			    ctrl.loadMetas();
			    ctrl.loadTaxonomies();
			}, function () {
			    alert($translate.instant('Failed to load term'));
			})
			.finally(function () {
			    ctrl.loadingTerm = false;
			});
	    };

	    /*
	     * Load metas of term
	     */
	    this.loadMetas = function () {
		var ctrl = this;
		this.loadingMetas = true;
		ctrl.term.getMetadatas()//
			.then(function (res) {
			    ctrl.term.metas = res.items;
			}, handlError)
			.finally(function () {
			    ctrl.loadingMetas = false;
			});
	    };

	    /*
	     * Load taxonomies of term
	     */
	    this.loadTaxonomies = function () {
		var pp = new QueryParameter;
		pp.setFilter('term_id', this.term.id);
		var ctrl = this;
		this.loadingTaxonomies = true;
		//TODO: Masood,2019: Change the $cms.getTermTaxonomies(pp) to ctrl.term.getTermTaxonomies()
		$cms.getTermTaxonomies(pp)
			.then(function (res) {
			    ctrl.term.taxonomies = res.items || {};
			}, function () {
			    alert($translate.instant('Failed to load taxonomies'));
			})
			.finally(function () {
			    ctrl.loadingTaxonomies = false;
			});
	    };

	    /*
	     * Remove term
	     */
	    this.remove = function () {
		var ctrl = this;
		confirm('delete term ' + this.term.id + '?')//
			.then(function () {
			    ctrl.removingTerm = true;
			    return ctrl.term.delete();//
			})//
			.then(function () {
			    $location.path('terms');
			}, function (error) {
			    alert($translate.instant('Failed to delete term') + error.message);
			})//
			.finally(function () {
			    ctrl.removingTerm = false;
			});
	    };

	    /*
	     * Save term
	     */
	    this.save = function () {
		var ctrl = this;
		this.savingTerm = true;
		this.term.update()//
			.then(function () {
			    ctrl.edit = false;
			}, function () {
			    alert($translate.instant('Failed to update term'));
			})//
			.finally(function () {
			    ctrl.savingTerm = false;
			});;
	    };

	    /*
	     * Edit a Meta of the term
	     */
	    this.editMeta = function (meta, index) {
		var ctrl = this;
		$navigator.openDialog({
		    templateUrl: 'views/dialogs/amd-meta.html',
		    config: {
			model: angular.copy(meta)
		    }
		})//
			.then(function (meta) {
			    ctrl.updatingMeta = true;
			    return meta.update();
			})//
			.then(function (newMeta) {
			    ctrl.term.metas[index] = newMeta;
			})//
			.finally(function () {
			    ctrl.updatingMeta = false;
			});
	    };

	    /*
	     * Remove a Meta of the term
	     */
	    this.removeMeta = function (meta, index) {
		var ctrl = this;
		confirm('delete meta ' + meta.id + '?')//
			.then(function () {
			    ctrl.removingMeta = true;
			    return meta.delete();//
			})//
			.then(function () {
			    ctrl.term.metas.splice(index, 1);
			}, function (error) {
			    alert($translate.instant('Failed to delete meta') + error.message);
			})//
			.finally(function () {
			    ctrl.removingMeta = false;
			});
	    };

	    /*
	     * Add meta to term
	     */
	    var ctrl = this;
	    function addMeta() {
		$navigator.openDialog({
		    templateUrl: 'views/dialogs/amd-meta.html',
		    config: {
			model: {}
		    }
		})//
			.then(function (meta) {
			    ctrl.addingMeta = true;
			    return ctrl.term.putMetadatum(meta);
			})//
			.then(function (meta) {
			    ctrl.term.metas = ctrl.term.metas.concat(meta);
			})//
			.finally(function () {
			    ctrl.addingMeta = false;
			});
	    }


	    /*
	     * Edit a taxonomy of the term
	     */
	    this.editTaxonomy = function (taxonomy, index) {
		var ctrl = this;
		$navigator.openDialog({
		    templateUrl: 'views/dialogs/amd-in-term-taxonomy-new.html',
		    config: {
			model: angular.copy(taxonomy)
		    }
		})//
			.then(function (taxonomy) {
			    ctrl.updatingTaxonomy = true;
			    return taxonomy.update();
			})//
			.then(function (newTaxonomy) {
			    ctrl.term.taxonomies[index] = newTaxonomy;
			})//
			.finally(function () {
			    ctrl.updatingTaxonomy = false;
			});
	    };

	    /*
	     * Remove a taxonomy of the term
	     */
	    this.removeTaxonomy = function (taxonomy, index) {
		var ctrl = this;
		confirm('delete taxonomy ' + taxonomy.id + '?')//
			.then(function () {
			    ctrl.removingTaxonomy = true;
			    return taxonomy.delete();//
			})//
			.then(function () {
			    ctrl.term.taxonomies.splice(index, 1);
			}, function (error) {
			    alert($translate.instant('Failed to delete taxonomy') + error.message);
			})//
			.finally(function () {
			    ctrl.removingTaxonomy = false;
			});
	    };

	    /*
	     * Add taxonomy to the term
	     */
	    function addTaxonomy() {
		$navigator.openDialog({
		    templateUrl: 'views/dialogs/amd-in-term-taxonomy-new.html',
		    config: {
			model: {}
		    }
		})//
			.then(function (taxonomy) {
			    ctrl.addingTaxonomy = true;
			    taxonomy.term_id = ctrl.term.id;
			    //TODO: Masood, 2019: Replace the line with: return ctrl.term.putTermTaxonomy(taxonomy)
			    return $cms.putTermTaxonomy(taxonomy);
			})//
			.then(function (taxonomy) {
			    ctrl.term.taxonomies = ctrl.term.taxonomies.concat(taxonomy);
			})//
			.finally(function () {
			    ctrl.addingTaxonomy = false;
			});
	    }

	    this.metaActions = [{
		    title: 'New meta',
		    icon: 'add',
		    action: addMeta
		}];

	    this.taxonomyActions = [{
		    title: 'New taxonomy',
		    icon: 'add',
		    action: addTaxonomy
		}];

	    this.loadTerm();
	});
