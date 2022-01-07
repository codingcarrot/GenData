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
			connectionLimit : 100,
			host: db.host,
			user: db.user,
			password: db.password,
			database: "gen_user"
	},
	// var user_pool  = {
	//   connectionLimit : 10,
	//   host            : db.host,
	//   user            : db.user,
	//   password        : db.password,
	//   database        : "gen_user"
	// },

	// SNP database
	// var snp_pool  = {
	//   connectionLimit : 10,
	//   host            : db.host,
	//   user            : db.user,
	//   password        : db.password,
	//   database        : "Genome_backup"
	// },

	SNP_db: {
			connectionLimit : 100,
			host: db.host,
			user: db.user,
			password: db.password,
			database: "Genome_backup"
	},

 	//handle disconnect
 	con: (config) => {
 		var pool = mysql.createPool(config);

 		pool.getConnection(function(err) {
			if(err) {
				console.log('error when connecting to db:', err);
				setTimeout(handleDisconneect, 2000);
			}
		});

		pool.on('error', function(err) {
			console.log('db error', err);
			if(err.code === 'PROTOCOL_CONNECTION_LOST') {
				module.exports.con(config);
			} else {
				throw err;
			}
		});

		return pool;
 	},
};
