module.exports = function(req, res, next) {

  Role.findOne({name: 'alumno'}).populate('users')
  	.then(function(role){
		for ( i = 0 ; i < role.users.length ; i++ ) {
			if ( role.users[i].id == req.session.passport.user ) {
				return next();
			}
		}
  	})
  	.catch(function(error) {
  		return res.forbidden('You are not permitted to perform this action.');
  	});

};