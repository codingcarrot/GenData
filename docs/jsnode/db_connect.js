// db_connect.js
//use var dbcon = require('./dbconnect')

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mouse00cyte1@",
  database: "Genome"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function test(){
	return ("haha");
}

exports.test = function(){
	return test();
}