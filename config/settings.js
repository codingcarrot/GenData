const siteTitle = "Cell Lines";


module.exports = {
	baseURL: "http://143.89.24.151:80/",
	index: (results, name, rights) => {
		let setting = {
						siteTitle : siteTitle,
						pageTitle : "Cell Types",
						celllines : results,
						name: name,
						rights : rights
					  };
		return setting;
	},

	admin: (message, success, email, rights) => {
		let setting = {
						siteTitle : siteTitle,
						pageTitle: "Admin",
						message : message,
						success : success,
						email : email,
						rights : rights
					  };
		return setting;
	},

	register: (errors) => {
		let setting = {
						siteTitle : siteTitle,
						pageTitle : "User registration",
						errors
					  };
		return setting;
	},

	login: () => {
		let setting = {
						siteTitle : siteTitle,
						pageTitle : "login"
					  };
		return setting;					  
	},

	search: (results, message, rights) => {
		let setting = {
			siteTitle : siteTitle,
			pageTitle : "search",
			celllines : results,
			message : message,
			rights : rights
		}
		return setting;
	},

	search_results: (results, keyList, query_key, rights) => {
		let setting = {
			siteTitle : siteTitle,
			pageTitle : "search-results",
			results : results,
			keyList : keyList,
			query_key : query_key,
			rights : rights
		}
		return setting;
	},

	contact: (rights) =>{
		let setting = {
						siteTitle : siteTitle,
						pageTitle : "Contact Us",
						address : "Rm 5008, CYT building, HKUST, Clear Water Bay, HK",
						tel : "(+852) 98098718",
						admin : "tiffanytze@ust.hk",
						rights : rights
					   };
		return setting;
	},

	mail: {
		service: 'gmail',
		sender: 'tiffanymak1996@gmail.com',
	},
};
