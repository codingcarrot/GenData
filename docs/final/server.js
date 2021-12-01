/****
	*	Import all node modules
  	*
****/
	/*
	***@ Core node modules
	*/
	const express = require('express');
	const expressLayouts = require('express-ejs-layouts');
	const app = express();
	const bodyParser = require('body-parser');
	const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
	const bcrypt = require('bcryptjs');
	const validator = require('validator');
	const flash = require('connect-flash');
	const session = require('express-session');
	const config = require("./config/database");
	const mongoose = require('mongoose');
	
//Passport config
require('./config/passport')(passport);

//Connect to Mongo
mongoose.connect(config.mongoURI, { useNewUrlParser: true,  useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json()	);

//Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.errors_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

/****
	*App config
	*
****/

// app.use(express.static("public"));

/****
	*
	*	Import all related JavaScript and CSS files to inject in APP
	*
****/
	app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
	app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
	app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
	app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
	app.use('/css', express.static(__dirname + '/views/public/css'));
	app.use('/js', express.static(__dirname + '/views/public/js'));
	app.use('/partials', express.static(__dirname + '/views/partials'));
	app.use('/pages', express.static(__dirname + '/views/pages'));
	app.use('/public', express.static(__dirname + '/views/public'));



/**********************************************************************************************************************************/
/**********************************************************************************************************************************/

/****
	*
	*	When page is loaded
	*	Default page is loaded and the data is being called from MySQL database
	*	We are also adding some JavaScripts and CSS styles
	*	For all the dependencies - see the pacjage.json file for more information
	*
****/

/******
	****	All page routes
******/
const publicRouter = require("./routes/public");
const adminRouter = require("./routes/admin");
const searchRouter = require("./routes/search");
const usersRouter = require("./routes/users");
// const registerRouter = require("./routes/register");

/****
	*
	*	All page renderings 
	*
****/
app.use('/', publicRouter);
app.use('/admin', adminRouter);
app.use('/search', searchRouter);
// app.use('/register', registerRouter);
app.use('/users', usersRouter);

// app.use('/login', loginRouter);


/****
	*
	*	Connect to the server
	*
****/
var server = app.listen(80, function(){
	console.log("Server started on 80....");
});