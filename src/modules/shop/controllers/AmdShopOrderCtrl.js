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
@name AmdShopOrderCtrl
@description load the order

@ngInject
 */
export default function(ShopOrder, $controller, $scope,
	$shop, $mbTranslate, $state, $mbDialog, $window, $mbActions) {

	/*
	 * Extends collection controller from MbAbstractCtrl 
	 */
	angular.extend(this, $controller('MbSeenAbstractCtrl', {
		$scope: $scope
	}));

	this.order = {};
	this.actions = [];
	this.totalP = 0;

	this.loadOrder = function() {
		if (this.loading) {
			return;
		}
		this.loading = true;
		var ctrl = this;
		$shop.getOrder($state.params.orderId, {
			graphql: '{id,title,full_name,phone,email,province,city,address,description,state,creation_dtime,modif_dtime,' +
	/* */'order_items{title,price,count,item_type},' +
	/* */'histories{object_type,object_id,subject_type,subject_id,creation_dtime,action,description},' +
	/* */'customer{id,date_joined,profiles{first_name,last_name,public_email,gender,language,timezone}}, ' +
	/* */'attachments{id,description,mime_type,file_name,file_size},' +
	/* */'assignee{id,date_joined,profiles{first_name,last_name,public_email,gender,language,timezone}},' +
	/* */'metafields{key,value,namespace}}'
		})//
			//graphql: '{id,title,full_name,phone,email,address,description,state,order_items{title,price,count,item_type},histories{action,description},customer{id,profiles{first_name,last_name}},assignee{id,profiles{first_name,last_name}}}'
			.then(function(order) {
				ctrl.initialize(order);
			}, function() {
				alert($mbTranslate.instant('Failed to load the order.'));
			})//
			.finally(function() {
				ctrl.loading = false;
			});
	};

	this.initialize = function(order) {
		this.order = new ShopOrder(order);
		this.loadActions();
		this.totalPrice();
	};

	/**
	 * Calculate total price of the order.
	 * 
	 * @memberof AmdShopOrderCtrl
	 */
	this.totalPrice = function() {
		var totalPrice = 0;
		angular.forEach(this.order.order_items, function(orderItm) {
			totalPrice += orderItm.price * orderItm.count;
		});
		this.totalP = totalPrice;
	};

	this.loadActions = function() {
		if (this.actionLoading) {
			return;
		}
		this.actionLoading = true;
		var ctrl = this;
		return this.order.getPossibleTransitions()
			.then(function(res) {
				ctrl.actions = res.items;
			}, function() {
				alert($mbTranslate.instant('Failed to load possible actions.'));
			})//
			.finally(function() {
				ctrl.actionLoading = false;
			});
	};

	this.doAction = function(transition, $event) {
		return $mbActions
			.exec(SEEN_MODEL_TRANSITIONS_CREATE, _.assign($event || {}, {
				values: [this.order],
				transition: transition,
				storePath: AMD_SHOP_ORDERS_SP
			}));
	};

	this.showImage = function(order, attachment, $event) {
		$mbDialog
			.show({
				templateUrl: 'views/dialogs/show-image.html',
				config: {
					order: order,
					attachment: attachment
				},
				targetEvent: mbDialog
			});
	};

	this.callToCustomer = function() {
		var str = 'tel:' + this.order.phone;
		$window.open(str);
	};

	this.showDetailOfHistory = function(history, $event) {
		$mbDialog
			.show({
				templateUrl: 'views/shop/order-history-detail-dialog.html',
				config: {
					history: history
				},
				targetEvent: $event
			});
	};


	this.loadOrderController = function() {
		var ctrl = this;
		ctrl.addEventHandler(AMD_SHOP_ORDERS_SP, function($event) {
			var flag = false;
			var order = ctrl.order;
			_.forEach($event.values, function(value) {
				if (_.isEqual(value.id, order.id)) {
					flag = true;
				}
			});
			if (!flag) {
				return;
			}
			//			switch ($event.key) {
			//				case 'updated':
			//					ctrl.loadOrder();
			//					break;
			//			case 'removed':
			//				ctrl.removeViewItems($event.values);
			//				break;
			//				default:
			//					break;
			//			}
			ctrl.loadOrder();
		});
		ctrl.loadOrder();
	};

	this.loadOrderController();
}

