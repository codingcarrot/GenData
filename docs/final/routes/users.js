const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mysql = require("mysql");
const db_con = require("../config/db_connect");
const settings = require("../config/settings");
const validator = require('validator');

//User model
const User = require('../models/User');

//user db connection 
const con_user = db_con.con(db_con.User_db);


//login page
	router.get("/login", (req, res, next) => {res.render('pages/login', settings.login());})
	// router.get('/login', (req, res) => res.render('pages/login'));
//login post method
   	router.post('/login', (req, res, next) => {
	  passport.authenticate('local', {
	    successRedirect: '/',
	    failureRedirect: '/users/login',
	    failureFlash: true
	  })(req, res, next);
	});

//logout redirect 
	router.get('/logout', (req, res) => {
		req.logout();
		req.flash('success_msg', 'You are logged out');
		res.redirect('/users/login');
	})

//register page
router.get("/register", (req, res) => res.render('pages/user-registration.ejs',settings.register()));

//register handle
router.post('/register', (req, res) => {
	const {name, email, username, password, password2, invitation } = req.body;
	let errors = [];

	//Check required fields
	if(!name || !email || !password || !password2 || !invitation) {
		errors.push({msg: 'Please fill in all fields'});
	}

	//Check passwords match
	if(password	!== password2){
		errors.push({ msg: 'passwords do not match'});
	}

	//Check pass length
	if(password.length < 6){
		errors.push({msg: "Password should be at least 6 characters"});
	}

	if(!validator.isEmail(email)){
		errors.push({msg:"Invalid email."})
	}

	//if everything checks out 
	//Check if invitation code is valid
	if(errors.length > 0){
		res.render('pages/user-registration.ejs', settings.register(errors)
		// {
		// 	errors,
		// 	name,
		// 	email,
		// 	password,
		// 	password2,
		// 	invitation
		// }
		);
	} else {
		var yesterday = new Date();
		var int_yesterday = yesterday.setDate(new Date().getDate()-1);	//int
		con_user.query('select code from inv_code where email = ? and time_created > ?;',[ email, int_yesterday], function(err, results, fields)	{
			if(results[0]) {
				//check if invitation code matches
				bcrypt.compare(invitation, results[0].code, (err, boo) => {
					if(!boo) {
						errors.push({msg: "Invalid invitation code."})
					} else {
						//Validation passed
						User.findOne({ email: email })
							.then(user => {
								if(user) {
									//user exists
									errors.push({msg: 'Email is already registered'})
									res.render('pages/user-registration.ejs', settings.register(errors)
									// {
									// 	errors,
									// 	name,
									// 	email,
									// 	password,
									// 	password2,
									// 	invitation
									// }
									);
								} else {
									const newUser = new User({
										name,
										username,
										email,
										password, 
										rights: 'normal'
									})

									//Hash password
									bcrypt.genSalt(10, (err, salt) => 
										bcrypt.hash(newUser.password, salt, (err, hash) => {
											if(err) throw err;
											// Set password to hash
											newUser.password = hash;
											newUser.save()
												.then(user => {
													req.flash('success_msg', 'You are now registered and can log in');
													res.redirect('/users/login');
												})
												.catch(err => console.log(err));
									}))
								}
						});
					}
				})
			} else {
				errors.push({msg: "You are not eligible for registration, please contact tiffanytze@ust.hk for an invitation code."});
				res.render('pages/user-registration.ejs', settings.register(errors)
				// {
				// 	errors,
				// 	name,
				// 	email,
				// 	password,
				// 	password2
				// }
				);
			}
		})
	}
});
module.exports = router;