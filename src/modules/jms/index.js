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


//mblowfish
//
//	/**
//	 * @ngdoc Factories
//	 * @name SuperJmsPipeline
//	 * @description the pipline access
//	 * 
//	 */
//	.factory('SuperJmsPipeline', seen.factory({
//		url: '/api/v2/superjms/pipelines'
//	})) //
//
//	/**
//	 * @ngdoc service
//	 * @name $superjms
//	 * @description Job management service on all tenants
//	 * 
//	 * Manages jobs of all tenants
//	 * 
//	 */
//	.service('$superjms', seen.service({
//		resources: [{
//			name: 'Pipeline',
//			factory: 'SuperJmsPipeline',
//			type: 'collection',
//			url: '/api/v2/superjms/pipelines'
//		}]
//	}))
//
//	/**
//	 * @ngdoc Factories
//	 * @name JmsPipeline
//	 * @description a pipeline manager
//	 * 
//	 */
//	.factory('JmsPipeline', seen.factory({
//		url: '/api/v2/jms/pipelines'
//	})) //
//
//	/**
//	 * @ngdoc service
//	 * @name $jms
//	 * @description Job management service
//	 * 
//	 * Manages jobs
//	 * 
//	 */
//	.service('$jms', seen.service({
//		resources: [{
//			name: 'Pipeline',
//			factory: 'JmsPipeline',
//			type: 'collection',
//			url: '/api/v2/jms/pipelines'
//		}]
//	}))
//
//	.config(function($mbViewProvider, $mbEditorProvider) {
//		var viewGroups = ['Job Management'];
//		$mbViewProvider
//			.addView('/pipelines', {
//				title: 'Jobs',
//				icon: 'dvr',
//				controller: 'AmdJmsPipelinesCtrl',
//				templateUrl: 'views/amd-jms-pipelines.html',
//				groups: viewGroups,
//			});
//
//		$mbEditorProvider
//			.addEditor('/pipelines/:pipelineId', {
//				controller: 'AmdJmsPipelineCtrl',
//				controllerAs: 'ctrl',
//				templateUrl: 'views/amd-jms-pipeline.html',
//			});
//	});