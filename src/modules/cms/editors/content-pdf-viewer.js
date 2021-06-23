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

import MbSeenAbstractItemEditorCtrl from '../../core/controllers/MbSeenAbstractItemEditorCtrl';

export class MbCmsContentPdfEditor extends MbSeenAbstractItemEditorCtrl {

	constructor($state, $element, $cms, $httpParamSerializer) {
		'ngInject';
		super($scope, $editor, $q);
		this.loadObject();
		this.$cms = $cms;
		this.$state = $state;
		this.$element = $element;
		this.$httpParamSerializer = $httpParamSerializer;
	}

	loadObject() {
		this.$cms.getContent(this.$state.params.contentId)
			.then(function(content) {
				_.assign(content, {
					url: '/api/v2/cms/contents/' + content.id + '/content'
				});
				this.$element.find('iframe')
					.attr('src', '/vw-pdf/web/viewer.html?' + this.$httpParamSerializer(content))
					.css({
						'flex-grow': 1,
						'border': 'none',
						'overflow': 'hidden'
					});
			});
	}
}


export default {
	title: 'PDF Viewer',
	icon: 'text',
	template: '<iframe></iframe>',
	controllerAs: 'ctrl',
	supportedMimetypes: ['application/pdf'],
	controller: MbCmsContentPdfEditor,
}




