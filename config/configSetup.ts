import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
	NODE_ENV: string;
	PORT: number;
	SSL: boolean;
	JWTSECRET: string;
	JWT_EXPIRY_TIME: string;
	DBNAME: string;
	DBUSERNAME: string;
	DBPASSWORD: string;
	DBHOST: string;
	DBPORT: number;
	DBDIALECT: string;
	MAIL_FROM: string;
	MAIL_FROM_NAME: string;
	BASE_API_URL: string;
	TOKEN_SECRET: string;
    saltRounds: number;
};

const getConfig = (): Config => {
	return {
		NODE_ENV: process.env.NODE_ENV!,
		PORT: Number(process.env.PORT)!,
		SSL: true,
		JWTSECRET: process.env.JWTSECRET!,
		JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME!,
		TOKEN_SECRET: process.env.TOKEN_SECRET!,
		saltRounds: Number(process.env.saltRounds!),
		DBNAME: process.env.DBNAME!,
		DBUSERNAME: process.env.DBUSERNAME!,
		DBPASSWORD: process.env.DBPASSWORD!,
		DBHOST: process.env.DBHOST!,
		DBPORT: Number(process.env.DBPORT)!,
		DBDIALECT: process.env.DBDIALECT!,
		MAIL_FROM: process.env.MAIL_FROM!,
		MAIL_FROM_NAME: process.env.MAIL_FROM_NAME!,
		BASE_API_URL: process.env.BASE_API_URL!,
	};
};

const getSanitzedConfig = (config: Config) => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in .env`);
		}
	}
	return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
