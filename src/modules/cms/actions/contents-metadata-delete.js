
export default {
	demon: true,
	action: function($event, $mbDispatcherUtil) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return;
		}

		return confirm('Delete the microdata', $event)
			.then(function() {
				_.forEach(values, function(value) {
					value.delete()
						.then(function() {
							$mbDispatcherUtil.fireDeleted(AMD_CMS_METADATA_SP, value);
						}, function(/*error*/) {
							// TODO: maso, 2020: log errors
						});
				});
			});
	},
}



