mblowfish.addResource('amd-seen-user-roles', {
	title: 'Account Roles',
	templateUrl: 'scripts/module-user/resources/roles.html',
	tags: [AMD_USER_ROLES_RT],
	controllerAs: 'ctrl',
	controller: function($scope, $resource, $controller, $style) {
		'ngInject';
		angular.extend(this, $controller('MbSeenUserRolesCtrl', {
			$scope: $scope
		}));
		var ctrl = this;

		function setSelected(role, selected) {
			var roles = [];
			_.forEach(ctrl.items, function(item) {
				if ($style.multi && item.selected) {
					roles.push(item);
				} else {
					delete item.isSelected;
				}
			});
			role.selected = selected;
			if (selected) {
				roles.push(role);
			}
			$resource.setValue(roles);
		}

		function isSelected(role) {
			return role.isSelected;
		}

		_.assign(ctrl, {
			setSelected: setSelected,
			isSelected: isSelected,
		});
	}
});
