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
import mblowfish from 'mblowfish';

// >> actions
import contentsCreateAction from './actions/contents-create';
import contentsEditAction from './actions/contents-edit';
import contentsMetadataDeleteAction from './actions/contents-metadata-delete';
import contentsNewPageAction from './actions/contents-newPage';
import contentPropertiesAction from './actions/contents-properties';
import termTaxonomiesCreateAction from './actions/term-taxonomies-create';
import termTaxonomiesDeleteAction from './actions/term-taxonomies-delete';
import termCrateAction from './actions/terms-create';
import termDeleteAction from './actions/terms-delete';
// >> controllers
import MbCmsContentUrlResourceCtrl from './controllers/MbCmsContentUrlResourceCtrl';
import MbCmsContentsCtrl from './controllers/MbCmsContentsCtrl';
import MbCmsTermTaxonomiesCtrl from './controllers/MbCmsTermTaxonomiesCtrl';
// >> directives
import amdContentIconDirective from './directives/amdContentIcon';
import amdContentPreviewDirective from './directives/amdContentPreview';
// >> editors
import contentDocumentEditor from './editors/content-document-editor';
import contentPdfViewerEditor from './editors/content-pdf-viewer';
import contetnPropertiesEditor from './editors/content-properties';
import termTaxonomyEditor from './editors/term-taxonomy';
import termEditor from './editors/term';
import vwStudioExtEditor from './editors/vw-studio-external';
import vwStudioEditor from './editors/vw-studio';
// >> filters
// ?? resources
import categoryResources from './resources/category';
import contentMetadataResources from './resources/content-metadata';
import contentUploadResources from './resources/content-upload';
import imageUrlResources from './resources/image-url';
import tagResources from './resources/tag';
import termTaxonomyResources from './resources/term-taxonomy';
// >> services
import amdCmsEditors from './services/editors';
// >> views
import contentNewView from './views/content-new';
import contentsView from './views/contents';
import imagesView from './views/images';
import termTaxonomiesView from './views/term-taxonomies';
import termsView from './views/terms';

import termNewWizardPage from './wizards/new-term/term-page';
import termNewWizard from './wizards/new-term/wizard';

import termTaxonomyNewWizardPage from './wizards/new-term-taxonomy/term-taxonomy-page';
import termTaxonomyNewWizard from './wizards/new-term-taxonomy/wizard';

import contentNewPageWizardPageMetadata from './wizards/new-page/metadataPage';
import contentNewPageWizardPageOg from './wizards/new-page/ogPage';
import contentNewPageWizardPageProperties from './wizards/new-page/propertiesPage';
import contentNewPageWizardPageType from './wizards/new-page/typePage';
import contentNewPageWizard from './wizards/new-page/wizard';



import Constants from './Constants';

mblowfish
	.addConstants(Constants)

	// >> actions
	.action(AMD_CMS_CONTENTS_CREATE_ACTION, contentsCreateAction)
	.action(AMD_CMS_CONTENTS_EDIT_ACTION, contentsEditAction)
	.action(AMD_CMS_CONTENT_METADATA_DELET_ACTION, contentsMetadataDeleteAction)
	.action(AMD_CMS_CONTENTS_NEWPAGE_ACTION, contentsNewPageAction)
	.action(AMD_CMS_CONTENTS_PROPERTIES_ACTION, contentPropertiesAction)
	.action(AMD_CMS_TERMTAXONOMIES_CREATE_ACTION, termTaxonomiesCreateAction)
	.action(AMD_CMS_TERMTAXONOMIES_DELETE_ACTION, termTaxonomiesDeleteAction)
	.action(AMD_CMS_TERMS_CREATE_ACTION, termCrateAction)
	.action(AMD_CMS_TERMS_DELETE_ACTION, termDeleteAction)

	// >> controller
	.controller('MbCmsContentUrlResourceCtrl', MbCmsContentUrlResourceCtrl)
	.controller('MbCmsContentsCtrl', MbCmsContentsCtrl)
	.controller('MbCmsTermTaxonomiesCtrl', MbCmsTermTaxonomiesCtrl)

	// >> directives
	.directive('amdContentIcon', amdContentIconDirective)
	.directive('amdContentPreview', amdContentPreviewDirective)
	// >> editors
	.editor('/cms/document-editor/:contentId', contentDocumentEditor)
	.editor('/cms/pdf-viewer/:contentId', contentPdfViewerEditor)
	.editor('/cms/contents/:contentId', contetnPropertiesEditor)
	.editor('/cms/term-taxonomies/:itemId', termTaxonomyEditor)
	.editor('/cms/terms/:termId', termEditor)
	.editor('/cms/vw-studio-editor-ext/:contentId', vwStudioExtEditor)
	.editor('/cms/vw-studio-editor/:contentId', vwStudioEditor)
	// >> filters
	// >> resources
	.resource('cms.term-taxonomies.category', categoryResources)
	.resource('cms.metadata.keyval', contentMetadataResources)
	.resource('cms-upload', contentUploadResources)
	.resource('cms-image-url', imageUrlResources)
	.resource('cms.term-taxonomies.tag', tagResources)
	.resource('cms.term-taxonomies', termTaxonomyResources)

	// >> services
	.provider('$amdCmsEditors', amdCmsEditors)
	// >> views
	.view(AMD_CMS_VIEW_CONTENT_NEW_PATH, contentNewView)
	.view(AMD_CMS_VIEW_CONTENTS_PATH, contentsView)
	.view(AMD_CMS_VIEW_IMAGES_PATH, imagesView)
	.view(AMD_CMS_VIEW_TERMTAXONOMIES_PATH, termTaxonomiesView)
	.view(AMD_CMS_VIEW_TERMS_PATH, termsView)


	.wizardPage(AMD_CMS_TERM_NEW_WIZARD + '#term', termNewWizardPage)
	.wizard(AMD_CMS_TERM_NEW_WIZARD, termNewWizard)

	.wizardPage(AMD_CMS_TERMTAXONOMY_NEW_WIZARD + '#term-taxonomy', termTaxonomyNewWizardPage)
	.wizard(AMD_CMS_TERMTAXONOMY_NEW_WIZARD, termTaxonomyNewWizard)

	.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#metadata', contentNewPageWizardPageMetadata)
	.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#og', contentNewPageWizardPageOg)
	.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#properties', contentNewPageWizardPageProperties)
	.wizardPage(AMD_CMS_CONTENTS_NEWPAGE_WIZARD + '#type', contentNewPageWizardPageType)
	.wizard(AMD_CMS_CONTENTS_NEWPAGE_WIZARD, contentNewPageWizard)

	// Integerate
	.run(function($mbToolbar) {
		'ngInject';

		$mbToolbar.getToolbar(AMD_CMS_VIEW_TERMS_PATH)
			.addAction(AMD_CMS_TERMS_CREATE_ACTION);

		$mbToolbar.getToolbar(AMD_CMS_VIEW_TERMTAXONOMIES_PATH)
			.addAction(AMD_CMS_TERMTAXONOMIES_CREATE_ACTION);
	});

