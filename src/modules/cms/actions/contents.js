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

import $mbActions from 'mblowfish/src/services/mbActions';
import {
	AMD_CMS_CONTENTS_NEWPAGE_WIZARD,
	AMD_CMS_CONTENT_SP,
	AMD_CMS_CONTENTS_EDIT_ACTION,
	AMD_CMS_CONTENTS_CREATE_ACTION
} from '../Constants';


const FullContentgraphqlQuery =
	'{id,name,title,description,state,creation_dtime,modif_dtime,downloads,file_name,file_size,media_type,mime_type,' +
	'term_taxonomies{id,taxonomy,term{id,name}},' +
	'metas{id,key,value}}';

/**
Creates new content

 */
export function createContents($event, $cms, $q, $mbDispatcherUtil) {
	'ngInject';
	var values = [];
	if ($event) {
		values = $event.values;
	}
	if (!values || !_.isArray(values)) {
		return;
	}
	var jobs = [],
		contents = [];
	values.forEach(value => {
		var content = value.content || value.file;
		var metadata = value.metadata;
		delete value.content;
		delete value.file;
		delete value.metadata;
		// TODO: support termtaxonomy
		var promise = $cms.putContent(value);
		if (content) {
			promise = promise.then(function(newContent) {
				contents.push(newContent);
				var newJobs = [];
				newJobs.push(newContent.uploadValue(content));
				if (metadata) {
					_.forEach(metadata, function(item) {
						newJobs.push(newContent.putMetadatum(item));
					});
				}
				return $q.all(newJobs)
					.finally(function() {
						return newContent;
					});
			});
		} else {
			promise
				.then(function(newContent) {
					contents.push(newContent);
				});
		}
		jobs.push(promise);
	});


	return $q.all(jobs)
		.then(function() {
			$mbDispatcherUtil.fireCreated(AMD_CMS_CONTENT_SP, contents);
			return $mbActions.exec(AMD_CMS_CONTENTS_EDIT_ACTION, {
				values: contents
			});
		});
}

export function editContents($event, $amdCmsEditors) {
	'ngInject';
	var values = [];
	if ($event) {
		values = $event.values;
	}
	if (!values || !_.isArray(values)) {
		return;
	}
	var editorName = $event.editor;
	if (!_.isUndefined(editorName) && !_.isString(editorName)) {
		editorName = editorName.name;
	}
	_.forEach(values, function(content) {
		$amdCmsEditors.openContent(content, editorName);
	});
}

export function createNewPage($event, $mbWizard) {
	'ngInject';
	var values = [];
	if ($event) {
		values = $event.values;
	}
	if (!values || !_.isArray(values)) {
		return $mbWizard.openWizard(AMD_CMS_CONTENTS_NEWPAGE_WIZARD);
	}
	return $mbActions.exec(AMD_CMS_CONTENTS_CREATE_ACTION, $event);
}


export function deleteContentMetadata($event, $mbDispatcherUtil) {
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
}


export function openContentProperties($event, $amdCmsEditors) {
	'ngInject';

	var values = $event.values;
	if (!values || !_.isArray(values)) {
		return;
	}
	values.forEach((content) => {
		$amdCmsEditors.openProperties(content);
	});
}



