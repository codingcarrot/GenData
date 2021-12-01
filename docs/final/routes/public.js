const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db_con = require("../config/db_connect");
const settings = require("../config/settings");
const err_handle = require("../debug/error_handling");
const validator = require('validator');
const bcrypt = require("bcryptjs");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//SNP database connection
const con_SNP = db_con.con(db_con.SNP_db);
const con_user = db_con.con(db_con.User_db);

//Home page
	router.get("/", ensureAuthenticated, (req, res, next) => {
		con_SNP.query('select distinct(Name) from cellline;', (err, results, fields) => {
			err_handle.error(err);
			res.render('pages/index',settings.index(results, req.user.name, req.user.rights));
			console.log('access to home');
			console.log(req.user.name);
			var now = Date();
			console.log(now);
		});
	})
//Contact page
	router.get("/contact", ensureAuthenticated, (req, res, next) => {
		res.render('pages/contact.ejs',settings.contact(req.user.rights));
		console.log('access to contact');
		console.log(req.user.name);
		var now = Date();
		console.log(now);
	});

module.exports = router;