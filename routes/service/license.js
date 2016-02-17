Router.route('/license', {
	name: 'license',
	subscriptions: function() {
		return Meteor.subscribe("licenseTypeLists");
	},
	waitOn: function() {
		return Meteor.subscribe("licenseTypeLists");		
	}
})