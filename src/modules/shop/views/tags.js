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

import templateUrl from './tags.html';


/**
@ngdoc Views
@name /shop/tags
@description Manages list of categories


 */
export default {
	title: 'Tags',
	icon: 'label',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	groups: ['Shop'],
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner", "shop.agencyOwner", "shop.staff")',
	controller: function($scope, $controller, $view, $shop) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the function
		this.getModelSchema = function() {
			return $shop.tagSchema();
		};

		// get accounts
		this.getModels = function(parameterQuery) {
			return $shop.getTags(parameterQuery);
		};

		// get an account
		this.getModel = function(id) {
			return $shop.getTag(id);
		};

		// delete account
		this.deleteModel = function(model) {
			return $shop.deleteTag(model.id);
		};

		/***********************************************************
		 * Initialize the controller
		 ***********************************************************/
		this.init({
			eventType: AMD_SHOP_TAG_SP,
		});
	}
}

