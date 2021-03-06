/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import templatUrl from './category.html';
/**
@ngdoc Editors
@name /shop/categories/:categoryId
@description
Manage a shop category.

 */
export default {
	templateUrl: templatUrl,
	controllerAs: 'ctrl',
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function($editor, $scope, $state, $shop, $controller, $mbTranslate, $mbActions, $mbUtil) {
		'ngInject';

		var isEqualId = $mbUtil.isEqualId;
		// Extends collection controller from MbAbstractCtrl 
		angular.extend(this, $controller('MbAbstractCtrl', {
			$scope: $scope
		}));

		//-------------------------------------------------------------------------
		// Variables
		//-------------------------------------------------------------------------
		var graphqlQuery =
			'{id,name,description,thumbnail,parent_id,' +
			'parent{id,name,description,thumbnail}' +
			'children{id,name,description,thumbnail}}';
		//	var categoryProductAssos = AMD_CMS_CONTENT_SP + '/' + $state.params.contentId + '/term-taxonomies';
		//	var categoryServiceAssos = AMD_CMS_CONTENT_SP + '/' + $state.params.contentId + '/term-taxonomies';

		var ctrl = this;
		var category = {};
		var categoryId = $state.params.categoryId;
		var children = [];
		var parent = {};


		//-------------------------------------------------------------------------
		// functions
		//-------------------------------------------------------------------------
		function exec(actionId, $event) {
			if (ctrl.isBusy) {
				// TODO: add warning
				return;
			}
			ctrl.isBusy = $mbActions.exec(actionId, $event)
				.finally(function() {
					delete ctrl.isBusy;
				});
			return ctrl.isBusy;
		}

		function deleteCategory($event) {
			$event.values = [category];
			return exec(AMD_SHOP_CATEGORY_DELETE_ACTION, $event)
				.then(function() {
					$editor.close();
				});
		}

		function updateCategory($event) {
			$event.values = [category];
			return exec(AMD_SHOP_CATEGORY_UPDATE_ACTION, $event);
		}

		function addChild($event) {
			$event = $event || {};
			$event.values = [{
				parent_id: category.id
			}];
			return exec(AMD_SHOP_CATEGORY_CREATE_ACTION, $event);
		}

		function deleteChild(child, $event) {
			$event.values = [child];
			return exec(AMD_SHOP_CATEGORY_DELETE_ACTION, $event);
		}

		function setParent($value, $event) {
			if (_.isArray($value)) {
				$value = $value[0];
			}
			if (!_.isObject($value)) {
				$value = {
					id: $value,
				};
			}
			$event.category = category;
			$event.parent = $value;
			return $mbActions.exec(AMD_SHOP_CATEGORY_SETPARENT_ACTION, $event);
		}

		//-------------------------------------------------------------------------
		// End
		//-------------------------------------------------------------------------
		function parsCategory(categoryData) {
			category = categoryData;
			ctrl.category = category;
		}

		function parsChildren(childrenData) {
			children = childrenData;
			ctrl.children = children;
		}

		function parsParent(parentData) {
			parent = parentData;
			ctrl.parent = parentData;
		}

		function reload() {
			ctrl.isBusy = $shop
				.getCategory(categoryId, {
					graphql: graphqlQuery,
				})//
				.then(function(categoryData) {
					var childrenData = categoryData.children || [];
					var parentData = categoryData.parent || {};

					delete categoryData.children;
					delete categoryData.parent;

					parsCategory(categoryData);
					parsChildren(childrenData);
					parsParent(parentData);
				}, function() {
					alert($mbTranslate.instant('Failed to load the category.'));
				})//
				.finally(function() {
					delete ctrl.isBusy;
				});
			return ctrl.isBusy;

		}

		ctrl.addEventHandler(AMD_SHOP_CATEGORY_SP, function(event) {
			if (!category) {
				return;
			}
			_.forEach(event.values, function(value) {
				if (isEqualId(value.id, category.id)) {
					switch (event.key) {
						case 'create':
						case 'update':
							if (value.parent_id !== parent.id) {
								$shop.getCategory(value.parent_id)
									.then(function(category) {
										_.assign(parent, category);
									});
							}
							_.assign(category, value);
							break;
						case 'delete':
							$editor.close();
							break;
					}
				}
				if (isEqualId(value.id, parent.id)) {
					switch (event.key) {
						case 'create':
						case 'update':
							_.assign(parent, value);
							break;
						case 'delete':
							$editor.close();
							break;
					}
				}
				if (isEqualId(value.parent_id, category.id)) {
					switch (event.key) {
						case 'create':
						case 'update':
							var findItem = _.chain(children)
								.filter({ id: value.id })
								.map(function(item) {
									return _.assign(item, value);
								})
								.value();
							if (_.isEmpty(findItem)) {
								children.unshift(value);
							}
							break;
						case 'delete':
							children = _.remove(children, { id: value.id });
							break;
					}
				}
			});
		});

		_.assign(ctrl, {

			isBusy: false,
			isCategoryBusy: false,
			isSubcategoryBusy: false,

			children: children,
			parent: parent,
			category: category,

			deleteCategory: deleteCategory,
			updateCategory: updateCategory,
			setParent: setParent,

			addChild: addChild,
			deleteChild: deleteChild,
		});

		reload();
	}
}



