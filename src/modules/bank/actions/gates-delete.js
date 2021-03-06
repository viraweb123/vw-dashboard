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

mblowfish.addAction(AMD_BANK_GATES_DELETE_ACTION, {
	icon: 'delete',
	title: 'Delete',
	description: 'Delete gates',
	group: 'Bank',
	action: function($event, $q, $mbTranslate, $bank, $mbDispatcherUtil) {
		'ngInject';

		var values = $event.values;
		if (!values || !_.isArray(values)) {
			return;
		}

		var message = '';
		if (values.length === 0) {
			return $q.resolve([]);
		} else if (values.length === 1) {
			message = $mbTranslate.instant('Delete item (Undo is not support)?');
		} else {
			message = $mbTranslate.instant('Delete items (Undo is not support)?');
		}


		// TODO: maso, 2020: add the job into the job lists
		// $app.addJob('Adding new shop category', job);
		return confirm(message)//
			.then(function() {
				/* 
				TODO: maso, 2020: support bulkey delete from server
				START: {
				*/
				var jobs = [];
				_.forEach(values, function(value) {
					jobs.push($bank.deleteBackend(value.id));
				});
				/*}*/
				return $q.all(jobs)
					.then(function() {
						$mbDispatcherUtil.fireDeleted(AMD_BANK_GATE_SP, values);
					}, function() {
						alert($mbTranslate.instant('Fail to delete the item.'));
					});
			});
	},
});