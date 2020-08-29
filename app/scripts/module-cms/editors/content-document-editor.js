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

/*

@see https://github.com/mozilla/pdf.js/wiki/Viewer-options
*/
mblowfish.addEditor('/cms/document-editor/:contentId', {
	title: 'Document Editor',
	icon: 'text',
	template: '<iframe></iframe>',
	controllerAs: 'ctrl',
	supportedMimetypes: [
		'text/html',
		'application/weburger+json'
	],
	controller: function($state, $element, $cms, $httpParamSerializer, $mbLocal) {
		'ngInject';
		//------------------------------------------------------------------
		// Functions
		//------------------------------------------------------------------\
		function loadObject() {
			$cms.getContent($state.params.contentId,{
				graphql: '{id,media_type,mime_type,metas{id,key,value}}'
			})
				.then(function(content) {
					var metas = content.metas;
					delete content.metas;
					var language = $mbLocal.getLanguage();
					_.forEach(metas, function(meta){
						if(meta.key === 'language'){
							language = meta.value;
						}
					});
					content = _.assign(content, {
						language: language,
						file: '/api/v2/cms/contents/' + content.id + '/content',
						url: '/api/v2/cms/contents/' + content.id + '/content'
					});
					$element.find('iframe')
						.attr('src', '/vw-document/?' + $httpParamSerializer(content))
						.css({
							'flex-grow': 1,
							'border': 'none',
							'overflow': 'hidden'
						});
				});
		}

		//------------------------------------------------------------------
		// init
		//------------------------------------------------------------------
		loadObject();
	},
});









// https://www.viraweb123.ir/vw-document/?url=/api/v2/cms/contents/13688/content