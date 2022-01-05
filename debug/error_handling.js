
const err_throw = (err) => {
	if (err) {throw err;
	console.log(err);}
}

exports.error = err_throw;