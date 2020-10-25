
mblowfish.addView('/sdp/tags', {
	templateUrl: 'scripts/module-sdp/views/tags.html',
	title: 'Tags',
	icon: 'label',
	groups: ['Digital Assets'],
	controllerAs: 'ctrl',
	controller: function($scope, $view, $sdp, $controller, $mbActions) {
		'ngInject';

		angular.extend(this, $controller('SeenAbstractCollectionViewCtrl', {
			$scope: $scope,
			$view: $view,
		}));

		// Override the schema function
		this.getModelSchema = function() {
			return $sdp.tagSchema();
		};

		// get contents
		this.getModels = function(parameterQuery) {
			return $sdp.getTags(parameterQuery);
		};

		// get a content
		this.getModel = function(id) {
			return $sdp.getTag(id);
		};

		// delete account
		this.deleteModel = function(asset) {
			return $sdp.deleteTag(asset.id);
		};

		/**
		Opne the content with an editor
		 */
		this.openEditor = function(asset, $event) {
			$event.values = [asset];
			return $mbActions.exec(SDP_TAGS_EDIT_ACTION, $event);
		};

		this.init({
			eventType: SDP_TAGS_SP,
		});
	},
});