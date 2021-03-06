
/**
This action prform list of transitions into the list of models

- values: list of models (which are transable)
- transition: a transition to perform
- storePath: the model stoer path to propagate evetns
- data: properties to put transition

 */

export default {
	demon: true,
	action: function($event, $q, $mbLog, $mbDispatcherUtil, $mbWizard) {
		'ngInject';
		//>> precondition
		var values = $event.values || [];
		var transition = $event.transition;
		if (!values || !values.length) {
			return $q.reject('No model specified');
		}
		if (!transition) {
			// TODO: let user select a new one
			return $q.reject('Transition is required');
		}
		//>> Get parameters
		var action = {
			// TODO: maso, 2020: document a unique type
			action: transition.id,
			id: transition.id
		};

		if (transition.properties && transition.properties.length) {
			var data = $event.data;
			if (!data) {
				return $mbWizard
					.open(SEEN_MODEL_TRANSITION_DATA_WIZARD, {
						locals: {
							$values: values,
							$transition: transition,
							$storePath: $event.storePath
						}
					});
			}
			action = _.assign(action, $event.data);
		}

		//>> put transitions
		var successModel = [],
			faildModel = [];
		// 1- perform
		var jobs = [];
		_.forEach(values, function(model) {
			jobs.push(model.putTransition(action)
				.then(function(newModel) {
					successModel.push(newModel);
				}, function(error) {
					// TODO: maso, 2020: show error the the client
					faildModel.push(error);
					$mbLog.error(error);
				}));
		});
		return $q
			.all(jobs)
			.then(function() {
				// 2- fire
				if ($event.storePath && successModel.length) {
					$mbDispatcherUtil.fireEvent($event.storePath, action.id, successModel);
				}
				// show error
				if (faildModel.length) {
					alert('Failt to perform transition on some items', $event,);
				}
			});
	}
}


