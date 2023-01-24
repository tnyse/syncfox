// import { NextFunction, Request, Response } from 'express';
// import config from '../config/configSetup';


export const handleResponse = (res: any, statusCode: number, status: boolean, message: string, data?: any) => {
	return res.status(statusCode).json({
		status,
		message,
		data,
	});
};

export const successResponse = (res: any, message: string = 'Operation successfull', data?: any) => {
	return res.status(200).json({
		status: true,
		message,
		data,
	});
};

export const errorResponse = (res: any, message: string = 'An error occured', data?: any) => {
	return res.status(400).json({
		status: false,
		message,
		data,
	});
};


export const createRandomRef = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `txt_${result}`;
}





export const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export const RemoveExtraSpace = (value: string) => {
    return value.replace(/\s+/g, ' ');
}


