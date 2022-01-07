const nm = require("../node_modules/nodemailer");
const settings = require("./settings");

/*
	*mail service connection details
*/
	const transporter = nm.createTransport({
		service: settings.mail.service,
		auth: {
			user: settings.mail.sender,
			pass: 'iwfkxmjizrzsfjan'
		}
	});

module.exports = {

	content: (email, code) => {
		let subject = 'Account creation on SNPsearch';
		let text = 'Dear Applicant,\n\n';
			text += 'You have successfully applied for an invitation code to open your account on SNPSearch.\n\n\n';
			text += '\tThis is your invitation code: '+code+'\n\n\n';
			text += 'Please go to http://143.89.25.28/users/register to register for your own account with the code.\n';
			text += 'The code will be valid for 24 hours\n\n';
			text += 'Have a great day!\n\n';
			text += 'Best wishes,\n';
			text += 'SNPsearch';

		let mailOptions = {
		  from: settings.mail.sender,
		  to: email,
		  subject: subject,
		  text: text
		};
		return mailOptions;
	},

	sendMail: (mailContents) => {
		transporter.sendMail(mailContents, function(error, info){
			  if (error) {
			    	console.log(error);
			  } else {
			    	console.log('Email sent: ' + info.response);
			  }
		});
	},

}
