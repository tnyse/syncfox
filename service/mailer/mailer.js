// Import packages
const nodemailer = require("nodemailer");
const {config} = require('../../config/configSetup');

// Import function files
const { SendMailDataType, PrepareMailDataType } = require('../../helpers/types');

let transporter = nodemailer.createTransport({
    host: "sportdynamo.com",
    port: 465,
    auth: {
      user: "info@sportdynamo.com",
      pass: "tE#}]wzd%z{j"
    }})

// const transporter = nodemailer.createTransport({
// 	host: "syncfox.com",
// 	port: 465,
// 	auth: {
// 	  user: configs.MAIL_FROM,
// 	  pass: "fz?U101v8"
// 	}
// });
  



 const sendMail = async ({ senderName, senderEmail, mailRecipients, mailSubject, mailBody, mailAttachments }) => {
	try {
		let mailOptions = {
			from: senderEmail,
			to: mailRecipients,
			subject: mailSubject,
			html: mailBody
		};
		
		
		
		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				console.log("Error " + err);
			} else {
				console.log(data)
				return {
					status: true,
					message: 'Email sent successfully',
				};
			}
		});

	} catch (error) {
		console.log(JSON.stringify(error));
		return {
			status: false,
			message: `Email not sent ${error}`,
			email: mailRecipients,
		};
	}
};


 const prepareMail = async ({ mailRecipients, mailSubject, mailBody, senderName, senderEmail }) => {
	
	const _sendMail = await sendMail({
		senderName,
		senderEmail,
		mailRecipients,
		mailSubject,
		mailBody,
	});
	console.log(_sendMail)
	return {};
};



module.exports = {prepareMail, sendMail}