


 const userOnboardingTemplateData = ({ names, email, type}) => {
	return {
		mailSubject: 'Welcome to Syncfox',
		mailBody: `
			<p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Welcome onboard, ${names.split(' ')[0]}</p>
			<p>you are requested to join ${names}.</p>
			
			<p>click the link below to review the invitation.</p>
			<a ">Review Invitation</a>
			
			<p>New on simplefinance? You will be prompted to change your account's default's password upon login.</p>
		`,
	};
};





const userRequestLicenceTemplateData = ({ names, email, requestee}) => {
	return {
		mailSubject: 'Song Licence Request',
		mailBody: `
			
			<p>${names} usage licence is being requestd by ${requestee}.</p>
			
			<p>click the link below to review the request.</p>
			
			
			<p>New on syncfox? You will be prompted to change your account's default's password upon login.</p>
		`,
	};
};





const userMessageTemplateData = ({ names, email, requestee, note}) => {
	return {
		mailSubject: 'Song Licence Request Comment',
		mailBody: `
			
			<p>${names} usage licence is being requestd by ${requestee}.</p>
			
			<p>${note}</p>
			
			
			<p>New on syncfox? You will be prompted to change your account's default's password upon login.</p>
		`,
	};
};




 const emailVerifyTemplateData = ({otp, name}) => {
	return {
		mailSubject: 'Email Verification',
		mailBody: `
		<p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hi, ${name}</p>
		<p>OTP for your email verification is :</p>
		<p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">${otp}</p>
		<p>This OTP is valid for only 10 minutes</p>
	`,
	};
};



module.exports = {emailVerifyTemplateData, userOnboardingTemplateData, userRequestLicenceTemplateData, userMessageTemplateData}