const mysql = require("mysql");
const db = require("./database");

/****
	*
	*	Database connection details
	*	Localhost - When in production mode change this to your host
	*	User - User name of the database
	*	Password - Database password
	*	Database - Database is the name of the database
	*
****/

module.exports = {

	//User database
	User_db: {
			host: db.host,
			user: db.user,
			password: db.password,
			database: "gen_user"
	},

	// SNP database
	SNP_db: {
			host: db.host,
			user: db.user,
			password: db.password,
			database: "Genome_backup"
	},

 	//handle disconnect
 	con: (config) => {
 		var connection = mysql.createConnection(config);

 		connection.connect(function(err) {
			if(err) {
				console.log('error when connecting to do:', err);
				setTimeout(handleDisconneect, 2000);
			}
		});

		connection.on('error', function(err) {
			console.log('db error', err);
			if(err.code === 'PROTOCOL_CONNECTION_LOST') {
				module.exports.con(config);
			} else {
				throw err;
			}
		});

		return connection;
 	},
};
