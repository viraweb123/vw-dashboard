
mblowfish.view(SDP_VIEW_LINKS_PATH, {
	title: 'Links',
	icon: 'web_asset',
	groups: ['Digital Assets'],
	templateUrl: 'scripts/module-sdp/views/links.html',
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, $mbActions) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.linkSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getLinks(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getLink(id);
		};

		// delete account
		this.deleteModel = function(asset) {
			return $sdp.deleteLink(asset.id);
		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(link, $event) {
			$event.values = [link];
			return $mbActions.exec(SDP_LINKS_EDIT_ACTION, $event);
		};

		this.init({
			eventType: SDP_LINKS_SP,
		});
	},
});