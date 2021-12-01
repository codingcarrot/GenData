const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db_con = require("../config/db_connect");
const settings = require("../config/settings");
const err_handle = require("../debug/error_handling");
const validator = require('validator');
const generatePassword = require('password-generator');
const bcrypt = require("bcryptjs");
const mail = require("../config/mail");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



//user db connection
const con_user = db_con.con(db_con.User_db);

//function for code logging and email sending

const code_log_send = (res, code, timestamp, email, req) => {
	bcrypt.hash(code, 10, function(err, hash){
		//Store hash in password DB
		
		con_user.query('insert into inv_code values (0, ?, ?, ?);', [hash, timestamp, email], function(err, _results, fields){
			err_handle.error(err);
			// send email to applicant
				let mailContents = mail.content(email, code);
				mail.sendMail(mailContents);
				console.log(req.user.rights);
				res.render('pages/admin.ejs',settings.admin('', true, email, req.user.rights));
		})
	})
}

/*
	*Admin page
	* ADD function: if Admin log in, admin page will also be accessible through navbar
	* Direct access of page is denied if not logged in as admin, redirect to log in page, message: 'you are not logged in' ||'you are not logged in as admin'
	* TODO: add a function to prevent generating code for the same email more than once
*/
	router.get('/',ensureAuthenticated,  function(req, res){
		// if(req.user.rights == 'admin'){
			res.render('pages/admin.ejs',settings.admin('', false, '', req.user.rights));
			console.log('access to admin');
			console.log(req.user.name);
			var now = Date();
			console.log(now);
		// } else {
		// 	res.redirect('/');
		// }
		
	})

	router.post('/', ensureAuthenticated, function(req, res){
		// if(req.user.rights == 'admin'){
			var form = req.body;
			var email = form.email;
			if(validator.isEmpty(email)){
				message = "email is empty.";
				res.render('pages/admin.ejs',settings.admin(message, false, '', req.user.rights));
			}else if(!validator.isEmail(email)){
				message = "Invalid email.";
				res.render('pages/admin.ejs',settings.admin(message, false, '', req.user.rights));
			}else{
				//maximum generate 5 invitation codes
				var yesterday = new Date();
				var int_yesterday = yesterday.setDate(new Date().getDate()-1);	//int
				con_user.query('select count(*) as count from inv_code where time_created > ? union select email from inv_code where email = ? and time_created > ?;',[int_yesterday, email, int_yesterday], function(err, results, fields){
					if(err){
						throw err;
						console.log(err);
					}
					//results[0].count = number of valid code, results[1].count = email with codes already generated (if matched)
					if(results[0].count <5 && !results[1]){
						code_log_send(res, generatePassword(12, false), Date.now(), email, req);
					}else{
						if (results[1]){
							message = "Invitation code is already generated for this email.";
							res.render('pages/admin.ejs',settings.admin(message, false, '', req.user.rights));
						} else{
							message = "More than 5 invitation codes are generated.";
							res.render('pages/admin.ejs',settings.admin(message, false, '', req.user.rights));
						}
					}
				})
			}

		// } else {
		// 	res.redirect('/');
		// }
	})

module.exports = router;