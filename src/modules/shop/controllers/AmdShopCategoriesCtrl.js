/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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


/**
@ngdoc Controller
@name AmdShopCategoriesCtrl
@description load the order

@ngInject
 */
export default function($scope,/* $element,*/ $shop, $controller) {

	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope,
//		$element: $element
	}));

	// Override the function
	this.getModelSchema = function() {
		return $shop.categorySchema();
	};

	// get accounts
	this.getModels = function(parameterQuery) {
		return $shop.getCategories(parameterQuery);
	};

	// get an account
	this.getModel = function(id) {
		return $shop.getCategory(id);
	};

	// delete account
	this.deleteModel = function(model) {
		return $shop.deleteCategory(model.id);
	};

	this.init({
		eventType: AMD_SHOP_CATEGORY_SP,
	});
}



