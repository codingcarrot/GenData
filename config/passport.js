const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User model
const User = require('../models/User');

module.exports = function(passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			//Match User
			User.findOne({ username: username })
				.then(user => {
					if(!user){
						return done(null, false, {message: 'No user found'});
					}

					//MAtch password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if(err) throw err;

						if(isMatch) {
							return done(null, user);
						} else {
							return done(null, false, {message: 'Password incorrect.'});
						}
					})
				})
				.catch(err => console.log(err));
		})
	)

	passport.serializeUser((user, done) => {
	  done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});	
}