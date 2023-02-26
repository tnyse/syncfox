const dotenv = require('dotenv');
dotenv.config();

const config = {
		NODE_ENV: process.env.NODE_ENV,
		PORT: Number(process.env.PORT),
		SSL: true,
		JWTSECRET: process.env.JWTSECRET,
		CLIENT_ID: process.env.CLIENT_ID,
		JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME,
		TOKEN_SECRET: process.env.TOKEN_SECRET,
		saltRounds: Number(process.env.saltRounds),
		DBNAME: process.env.DBNAME,
		DBUSERNAME: process.env.DBUSERNAME,
		DBPASSWORD: process.env.DBPASSWORD,
		DBHOST: process.env.DBHOST,
		DBPORT: Number(process.env.DBPORT),
		DBDIALECT: process.env.DBDIALECT,
		MAIL_FROM: process.env.MAIL_FROM,
		MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
		BASE_API_URL: process.env.BASE_API_URL,
};

// const getConfig = () => {
// 	return {
// 		NODE_ENV: process.env.NODE_ENV,
// 		PORT: Number(process.env.PORT),
// 		SSL: true,
// 		JWTSECRET: process.env.JWTSECRET,
// 		CLIENT_ID: process.env.CLIENT_ID,
// 		JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME,
// 		TOKEN_SECRET: process.env.TOKEN_SECRET,
// 		saltRounds: Number(process.env.saltRounds),
// 		DBNAME: process.env.DBNAME,
// 		DBUSERNAME: process.env.DBUSERNAME,
// 		DBPASSWORD: process.env.DBPASSWORD,
// 		DBHOST: process.env.DBHOST,
// 		DBPORT: Number(process.env.DBPORT),
// 		DBDIALECT: process.env.DBDIALECT,
// 		MAIL_FROM: process.env.MAIL_FROM,
// 		MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
// 		BASE_API_URL: process.env.BASE_API_URL,
// 	};
// };

// const getSanitzedConfig = (config) => {
// 	for (const [key, value] of Object.entries(config)) {
// 		if (value === undefined) {
// 			throw new Error(`Missing key ${key} in .env`);
// 		}
// 	}
// 	return config as Config;
// };

// const config = getConfig();
// const sanitizedConfig = getSanitzedConfig(config);

// export default sanitizedConfig;
module.exports = {
	config
   };