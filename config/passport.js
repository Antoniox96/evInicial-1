// config/passport.js

var _ = require('lodash');
var _super = require('sails-permissions/config/passport');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.
	passport: {
		google : {
		    name: 'Google',
		    protocol: 'oauth2',
		    strategy: require('passport-google-oauth').OAuth2Strategy,
			options: {
			  clientID: '1068516171501-ajjivruohla5hrq5q9ah73t1qveqcu5h.apps.googleusercontent.com',
			  clientSecret: 'Fa6WYdwkly5K6uXyRxZSZpJS',
			  scope: ['profile', 'email'],
 		      hd: 'murciaeduca.es'
			}
	  	}		
	}
});