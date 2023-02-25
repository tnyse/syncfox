// import { TwoFaChannel } from '../models/UserSettings';

import { AccountType } from "../models/account";

export type SendMailDataType = {
	senderName: string;
	senderEmail: string;
	mailRecipients: string[] | string;
	mailSubject: string;
	mailBody: string;
	mailAttachments?: string;
};
export type PrepareMailDataType = {
	mailRecipients: string[] | string;
	mailSubject: string;
	mailBody: string;
	senderName: string;
	senderEmail: string;
};


export type GetOtpTemplateDataType = {
	otp: string;
	name: string;
	meta?: any;
};


export type UserTemplateData = {
	names: string|null;
	email: String |null,
	type: AccountType|null,
};


