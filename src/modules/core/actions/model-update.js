
/**

Required:

- values
- storePath
- deleteModel: a function to delete a model (if the model is not SeenModel)

 */
export default {
	demon: true,
	action: function($event, $mbDispatcherUtil, $q, $mbTranslate, $mbLog) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return $q.reject('No item specified.');
		}

		var jobs = [],
			successModel = [],
			faildModel = [];

		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		function updateModel(value) {
			var promise;
			if (_.isFunction($event.updateModel)) {
				promise = $event.updateModel(value);
			} else {
				promise = value.update();
			}
			promise.then(function() {
				successModel.push(value);
			}, function(error) {
				faildModel.push(value);
				$mbLog.error(error);
			});
			jobs.push(promise);
		}

		function fireEvents() {
			// 2- fire
			if ($event.storePath && successModel.length) {
				$mbDispatcherUtil.fireUpdated($event.storePath, successModel);
			}
			// show error
			if (faildModel.length) {
				alert($mbTranslate('Failt to delete some items'));
			}
		}

		function updateModels() {
			/* 
			TODO: maso, 2020: support bulkey delete from server
			START: {
			*/
			_.forEach(values, updateModel);

			/*}*/
			return $q.all(jobs)
				.then(fireEvents);
		}
		
		return updateModels();

	},
}