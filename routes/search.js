const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db_con = require("../config/db_connect");
const settings = require("../config/settings");
const err_handle = require("../debug/error_handling");
const validator = require('validator');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//SNPs db connection
const pool = db_con.con(db_con.SNP_db);





function renSearchWithMessage(_message, req, res){
	pool.query('select distinct(Name) from cellline;', function (err, results, fields)	{
		if (err) {throw err;
			console.log(err);}
		res.render('pages/search',settings.search(results, _message, req.user.rights));
		// con.release();
		// console.log("connection released");
		//Handle error after the release
		if (err) throw err;
		// Don't use the connection here, it has been returned to the pool.
	});
}

router.get('/',ensureAuthenticated,  function( req, res) {
	/*
		Get the search form for searching SNPs
	*/
	renSearchWithMessage("", req, res);
		console.log('access to search');
		console.log(req.user.name);
		var now = Date();
		console.log(now);
});

/*
	This is a POST method to data and pre-populate to the form
*/

router.get('/results', ensureAuthenticated, function(req, res) {
	res.redirect('/search');
})
router.post('/results', ensureAuthenticated, function(req,res){
		console.log(req.user.name);
		var message = "";
		var form = req.body;
		var cellline = form.cellline;
		var chrom = form.chromosomes;
		var id = form.id;
		// var id = '';	//todo
		var downstream = form.downstream;
		var upstream = form.upstream;
		var table = "";
		var query = "";
		var SNPquery = "";
		var keyList = "";
		if (typeof id !=="undefined") {
			id = id.replace(/ /g, "");
			id = id.split(',');}
		// if(chrom == ''){console.log('chrom is empty');} else {console.log(chrom);}
		// if(upstream == ''){console.log('upstream is empty');} else {console.log(upstream);}
		// if(downstream == ''){console.log('downstream is empty');} else {console.log(downstream);}
		// if(id == ''){console.log('id is empty');} else {console.log(id);}

		// Search by ID (given ID, find the corresponding chrom, query the right table)
			if(id != '' && chrom == '' && typeof upstream === 'undefined' && typeof downstream === 'undefined'){



			//for single ID
				// query = "select CHROM, POS from id_ref_table_v151 where ID = '" + id + "';";
				query = "select ID, CHROM, POS from lookup where ID in (" + pool.escape(id) + ");";
				console.log("query for chrom " + query);
				var now = Date();
				console.log(now);
				pool.getConnection(function(err, con){
					con.query(query, function(err, results, fields){
						if(err) {
							throw err;
							console.log(err);
						}
						console.log(results);
						if(results.length>0){
							//split result into chrom array + pos array
							var id_list = [];
							var chrom_list = [];
							var pos_list = [];
							for (var i = 0; i<results.length; i++){
								chrom_list.push(results[i].CHROM);
								pos_list.push(results[i].POS);
								id_list.push(results[i].ID);
							}
							//create a str with chrom elements: 1,2,3,4
							for (var i = 0; i<chrom_list.length; i++){
								if(i != chrom_list.length-1){
									chrom += chrom_list[i]+','; }
								else chrom += chrom_list[i];
							}
							// var pos = results[0].POS;

							query = "select CHROM_Available, tablename from cellline where Name = '" + cellline + "' and CHROM_Available in (" + chrom + ");";
							console.log('query for table ' + query);
							var now = Date();
							console.log(now);
							// console.log(form);
							con.query(query, function(err, results, fields){
								if(err) {
									throw err;
									console.log(err);
								}
								console.log(results);
								if(results.length>0){
									var table_list = [];
									var chrom_list_2 = [];
									for (var i = 0; i<results.length; i++){
										chrom_list_2.push(results[i].CHROM_Available);
									}
									//push according to chrom list
									for (var i = 0; i<chrom_list.length; i++){
										for(var j=0; j<chrom_list_2.length; j++){
											if(chrom_list[i] == chrom_list_2[j]){
												table_list.push(results[j].tablename);
												break;
											}
										}
									}

									SNPquery = "";

									for(var i=0; i<chrom_list.length; i++){
										console.log(i);
										console.log(SNPquery);
										if(i === chrom_list.length-1)
											 SNPquery += "select * from " + table_list[i] + " where POS = " + pos_list[i]+";";
										else SNPquery += "select * from " + table_list[i] + " where POS = " + pos_list[i] + " union ";
									}

									console.log('query for SNPs ' + SNPquery);
									var now = Date();
									console.log(now);
									con.query(SNPquery, function (err, _results, _fields)	{
										if (err) {throw err;
											console.log(err);}
										if (_results.length > 0){
											keyList = Object.keys(_results[0]);
											keyList = keyList.slice(1);
										}
										var query_key = "Showing all SNPs for "+ cellline +" chrom "+ chrom +" at " + id;
										res.render('pages/search-results.ejs',settings.search_results(_results, keyList, query_key, req.user.rights));
										console.log(_results);
										con.release();
										console.log("connection released1");
										//Handle error after the release
										if (err) throw err;
										// Don't use the connection here, it has been returned to the pool.
									});
								} else {
									//There is no results available for this chromosome in this cellline yet.
									message = 'There is no SNPs available for this chromosome in this cellline yet.';
									var now = Date();
									console.log(now);
									renSearchWithMessage(message, req, res);
									con.release();
									console.log("connection released2");
									//Handle error after the release
									if (err) throw err;
									// Don't use the connection here, it has been returned to the pool.
								}
							});
						} else {
							message = 'No results with such ID found.';
							var now = Date();
							console.log(now);
							renSearchWithMessage(message, req, res);
							con.release();
							console.log("connection released3");
							//Handle error after the release
							if (err) throw err;
							// Don't use the connection here, it has been returned to the pool.
						}

					});
				})

			}
		// Search by Pos (given Pos + chrom, query the right table )
			else if(typeof id === 'undefined' && chrom != '' && downstream != '' && upstream != '' && validator.isInt(downstream) && validator.isInt(upstream) && (upstream-downstream <= 10000000)){
				query = "select tablename from cellline where Name = '" + cellline + "' and CHROM_Available = '" + chrom + "';";
				var now = Date();
				console.log(now);
				console.log('query for table ' + query);
				// console.log(form);
				pool.getConnection(function(err, con){
					con.query("select tablename from cellline where Name = ? and CHROM_Available = ?;", [ cellline, chrom ] , function(err, results, fields){
						if(err) {
							throw err;
							console.log(err);
						}
						if(results.length>0){
							table = results[0].tablename;
							SNPquery = "select * from " + table + " where POS >= " + downstream + " and POS <= " + upstream + ";";
							var now = Date();
							console.log(now);
							console.log('query for SNPs ' + SNPquery);
							con.query("select * from " + table + " where POS >= ? and POS <= ?;",[ downstream, upstream ], function (err, _results, _fields)	{
								if (err) {throw err;
									console.log(err);}
								if (_results.length > 0){
									keyList = Object.keys(_results[0]);
									keyList = keyList.slice(1);
								}
								var query_key = "Showing all SNPs for "+ cellline +" chrom "+ chrom +" from " + downstream + " to " + upstream;
								res.render('pages/search-results.ejs',settings.search_results(_results, keyList, query_key, req.user.rights));
								console.log(_results);
								con.release();
								console.log("connection released4");
								//Handle error after the release
								if (err) throw err;
								// Don't use the connection here, it has been returned to the pool.
							});
						} else {
							//There is no results available for this chromosome in this cellline yet.
								message = 'There is no SNPs available for this chromosome in this cellline yet.';
								renSearchWithMessage(message, req, res);
								con.release();
								console.log("connection released5");
								//Handle error after the release
								if (err) throw err;
								// Don't use the connection here, it has been returned to the pool.
						}
					});
				})

			}
		//Invalid queries:
		else if (typeof id === 'undefined' && chrom != '' && downstream != '' && upstream != '' && validator.isInt(downstream) && validator.isInt(upstream) && upstream-downstream > 10000000){
				//all filled but upstream and downstream is not integer
				message = "The range between downstream and upstream is too large, please contain it with in 10,000,000bps, if a search with a region bigger than 10,000,000bps is needed please contact the administrator.";
				renSearchWithMessage(message, req, res);
		}
			else if (typeof id === 'undefined' && chrom != '' && downstream != '' && upstream != '' && (!validator.isInt(downstream) || !validator.isInt(upstream))) {
							//all filled but upstream and downstream is not integer
							message = "Position downstream and upstream must be integers.";
							renSearchWithMessage(message, req, res);
					}
			else if(id == '' && chrom != '' && (downstream == '' || upstream == '')){
				message = 'Please specify the range.';
				renSearchWithMessage(message, req, res);
			} else if(typeof id === 'undefined' && chrom == '' && (downstream != '' || upstream != '')){
				message = 'Please specify the chromosome.';
				renSearchWithMessage(message, req, res);
			}
			//else form is not appropriately filled!
			else {
				message = 'Please fill in all fields.'
				// message = 'Please specify either ID or chromosome with position range.'
				renSearchWithMessage(message, req, res);
			};

});

module.exports = router;
