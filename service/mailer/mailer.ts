// Import packages
import nodemailer from "nodemailer";
import configs from '../../config/configSetup';

// Import function files
import { SendMailDataType, PrepareMailDataType } from '../../helpers/types';




const transporter = nodemailer.createTransport({
	host: "cabrequestservices.com",
	port: 465,
	auth: {
	  user: configs.MAIL_FROM,
	  pass: "akpGq.TF7G(X"
	}
});

// const transporter = nodemailer.createTransport({
// 	host: "syncfox.com",
// 	port: 465,
// 	auth: {
// 	  user: configs.MAIL_FROM,
// 	  pass: "fz?U101v8"
// 	}
// });
  






export const sendMail = async ({ senderName, senderEmail, mailRecipients, mailSubject, mailBody, mailAttachments }: SendMailDataType) => {
	try {
		let mailOptions = {
			from: senderEmail,
			to: mailRecipients,
			subject: mailSubject,
			html: mailBody
		};
		
		
		
		transporter.sendMail(mailOptions, function (err: any, data: any) {
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


export const prepareMail = async ({ mailRecipients, mailSubject, mailBody, senderName, senderEmail }: PrepareMailDataType) => {
	
	const _sendMail: any = await sendMail({
		senderName,
		senderEmail,
		mailRecipients,
		mailSubject,
		mailBody,
	});
	console.log(_sendMail)
	// statuss: _sendMail.status, message: _sendMail.message 
	return {};
};
