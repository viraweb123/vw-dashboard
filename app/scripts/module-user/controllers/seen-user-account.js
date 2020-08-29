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


/**
 * @ngdoc Controllers
 * @name MbSeenUserAccountCtrl
 * @description Manages and display list of accounts
 * 
 * This controller is used in accounts list.
 * 
 */
mblowfish.controller('MbSeenUserAccountCtrl', function($scope, $usr, $controller) {
	angular.extend(this, $controller('MbSeenAbstractItemCtrl', {
		$scope: $scope
	}));

	// Override the function
	this.getModelSchema = function() {
		return $usr.accountSchema();
	};

	// get an account
	this.getModel = function(id) {
		return $usr.getAccount(id);
	};

	// delete account
	this.deleteModel = function(model) {
		return $usr.deleteAccount(model.id);
	};

	// update account
	this.updateModel = function(model) {
		return model.update();
	};

	this.init({
		eventType: AMD_USER_ACCOUNTS_SP
	});
});
