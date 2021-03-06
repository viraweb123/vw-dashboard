
/**
This is a general implementaint of an item editor controller.

Item is an instance of SeenObject. So the id is the main attribute of 
an item to identify.

## General use cases

- Handle sotre path event and manage current view state
- Signal to reaload
- Calls general update action
- Calls general delete action

## Customization

If the current model is not a seend model, then following function is
called:

- deleteItem: delete current Item
- updateItem: update current item with changes

## Setup

Following object is very important:

- Model
- Store Path

To setup the controller:

	this.setModel(model)
		.setStorePath(stoerPath);

@ngInject
 */
export default function($scope, $controller, $editor,
	$mbActions) {

	/*
	 * Extends collection controller from MbAbstractCtrl 
	 */
	angular.extend(this, $controller('MbSeenAbstractCtrl', {
		$scope: $scope
	}));

	/*
	 Generate default event handler
	 
	 If you are about to handle event with a custom function, please
	 override this function.
	 */
	this.eventHandlerCallBack = function() {
		if (this.$eventHandlerCallBack) {
			return this.$eventHandlerCallBack;
		}
		var ctrl = this;
		this.$eventHandlerCallBack = function($event) {
			var isMatch = false;
			var values = $event.values;
			_.forEach(values, function(value) {
				if (value.id === ctrl.model.id) {
					isMatch = true;
				}
			});
			if (!isMatch) {
				return;
			}
			switch ($event.key) {
				case 'delete':
					$editor.close();
					break;
				default:
					if (_.isFunction(ctrl.reload)) {
						ctrl.reload();
					}
					break;
			}
		};
		return this.$eventHandlerCallBack;
	};

	/**
	Sets the store path
	
	All events related to the object is published based on the store path.
	
	@param {string} storePath the path of the store
	@returns the controller itself
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.setStorePath = function(storePath) {
		if (this.storePath === storePath) {
			return this;
		}
		var callback = this.eventHandlerCallBack();
		if (this.storePath) {
			this.removeEventHandler(callback);
		}
		this.storePath = storePath;
		this.addEventHandler(this.storePath, callback);
		return this;
	};

	/**
	Sets the model
	
	This model is controlled and followed by the editor controller.
	
	@param {Object} model The modell to controll and follow
	@returns the controller itself
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.setModel = function(model) {
		this.model = model;
		return this;
	};

	/**
	 Adds the given transition to object. 

	In other word, do some transaction on SPA.
	
	@param {object} $transition To add to the current model.
	@param {Object} $event to pupulate into the system.
	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.putTransition = function(transition, $event) {
		return this.execOnModel(SEEN_MODEL_TRANSITIONS_CREATE, _.assign($event || {}, {
			transition: transition,
		}));
	};

	/**
	 Call general delete action on a seen model.

	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.deleteModel = function($event) {
		return this.execOnModel(SEEN_MODEL_DELETE_ACTION, $event);
	};

	/**
	 Call general update action on a seen model.

	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.updateModel = function($event) {
		var ctrl = this;
		return this.execOnModel(SEEN_MODEL_UPDATE_ACTION, $event)
			.then(function() {
				ctrl.setDerty(false);
			});
	};

	/**
	Execute a command on the current model item
	
	Delete and update are common action, and if there is no action, default controller
	action (updateItem, deleteItem) are used insted.
	
	@param String commandId to execute
	@param Event $event related to the source event
	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	
	 */
	this.execOnModel = function(commandId, $event) {
		var
			updateModelFunction,
			deleteModelFunction,
			ctrl = this;
		if (!_.isFunction(this.model.update)) {
			updateModelFunction = function() {
				ctrl.updateItem();
			};
		}
		if (!_.isFunction(this.model.delete)) {
			deleteModelFunction = function() {
				ctrl.deleteItem();
			};
		}
		return this.setJob($mbActions.exec(commandId, _.assign($event || {}, {
			values: [this.model],
			storePath: this.storePath,
			updateModel: updateModelFunction,
			deleteModel: deleteModelFunction,
		})));
	};

	/**
	Clears all errors and unlock the editor
	 */
	this.clearError = function() {
		// XXX: maso, 2020: clear all errors
	};

	/**
	Display error and loack the editor
	
	The error is 'Object Not Found'
	 */
	this.setObjectNotFoundError = function() {
		// XXX: maso, 2020: load error in editor area
	};

	/**
	Sets current controller job
	
	The controller is designe to do a single job at time.
	
	The current job lets the controller to know how login dose it tacke to run.
	
	@returns a promise to complete the job
	@memberof SeenAbstractItemEditorCtrl
	 */
	this.setJob = function(prommise) {
		var ctrl = this;
		this.isBusy = prommise
			.finally(function() {
				delete ctrl.isBusy;
			});
		return this.isBusy;
	};

	this.setTransitions = function(transitions) {
		this.transitions = transitions;
		return this;
	};

	this.setTitle = function(title) {
		$editor.setTitle(title);
		return this;
	};

	this.setDerty = function(derty) {
		$editor.setDerty(derty);
		return this;
	};

	this.isDerty = function() {
		return $editor.isDerty();
	};
}

