
/****
	*
	*	Database details
	*	Localhost - When in production mode change this to your host
	*	User - User name of the database
	*	Password - Database password
	*	Database - Database is the name of the database
	*
****/
/*** 
	*	Your db password is your access key link to access the monogoDB cluster: 
	*	Remember to have a single quote around the password/access key link
***/
const dbPassword = 'mongodb+srv://twtmak:il0DgA3V7H5qIJOC@test-rgrzt.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
	// host: "localhost",
	host: "143.89.24.151",
	user: "root",
	password: "Mouse00cyte1@",
	mongoURI: dbPassword
};