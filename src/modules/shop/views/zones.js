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

import templateUrl from './zones.html';
/**
@ngdoc Controllers
@name MbSeenShopZonesCtrl
@description Manages list of zones from shop domain

In the shop domain you are allowed to categorize agances into zones. This is a
main controller to manage list of zones.

 */
export default {
	title: 'Zones',
	icon: 'layers',
	templateUrl: templateUrl,
	controllerAs: 'ctrl',
	groups: ['Shop'],
	access: 'hasAnyRole("tenant.owner", "shop.zoneOwner")',
	controller: function($scope, $view, $controller, $shop) {
		'ngInject';

		angular.extend(this, $controller('MbSeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the function
		this.getModelSchema = function() {
			return $shop.zoneSchema();
		};

		// get accounts
		this.getModels = function(parameterQuery) {
			return $shop.getZones(parameterQuery);
		};

		// get an account
		this.getModel = function(id) {
			return $shop.getZone(id);
		};

		// delete account
		this.deleteModel = function(model) {
			return $shop.deleteZone(model.id);
		};

		this.init({
			eventType: AMD_SHOP_ZONE_SP,
		});
	}
}


