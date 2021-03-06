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

mblowfish.controller('AmdBackupSnapshotsController', function(
		/* angularjs      */ $scope, $controller,
		/* seen-tenant    */ $backup,
		/* mblowfish-core */ $mbActions
) {

	// Extends with ItemsController
	angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
		$scope: $scope
	}));
	/**
	 * Gets schema of the tenant model
	 */
	this.getModelSchema = function() {
		return $backup.snapshotSchema();
	};

	// get tenants
	this.getModels = function(parameterQuery) {
		return $backup.getSnapshots(parameterQuery);
	};

	// get a tenant
	this.getModel = function(id) {
		return $backup.getSnapshot(id);
	};

	// delete tenant
	this.deleteModel = function(item) {
		return item.delete();
	};

	// initial the controller
	this.init({
		eventType: '/backup/snapshots'
	});

	// add actions
	this.addActions([{
		title: 'New Backup',
		icon: 'add',
		action: function() {
			$mbActions.exec('create:/backup/snapshots');
		}
	}]);
});


