
mblowfish.addAction(AMD_ACCOUNT_MESSAGES_ACTION, {
	group: 'Account',
	title: 'Messages',
	description: 'Shows list of messages',
	icon: 'notifications',
	action: function($mbSidenav) {
		'ngInject';
		$mbSidenav.getSidenav(AMD_ACCOUNT_MESSAGES_SIDENAV).toggle();
	}
});