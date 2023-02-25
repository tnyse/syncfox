// import { NextFunction, Request, Response } from 'express';
// import config from '../config/configSetup';
const cloudinary = require('cloudinary').v2
import multer from "multer";
import * as fs from 'fs';
import * as path from 'path';


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





// cloudinary configuration
 cloudinary.config({
    cloud_name: 'dqth56myg',
    api_key: '774921177923962',
    api_secret: 'dDUKTJBycDHC4gjOKZ9UAHw8SAM'
  });
  
  
  
  
  
  
  
  
 export const imageStorage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
      cb(null, './image')
    },
    filename: (req:any, file:any, cb:any) => {
      let filename = Date.now() + "--" + file.originalname;
      cb(null, filename.replace(/\s+/g, ''))
    }
  });


  export const uploads = multer({
    storage: imageStorage,
  })


  export const upload_cloud = async (path:any)=>{
	const result = await cloudinary.uploader.upload(path,  { resource_type: 'auto' })
	return result;
  }



  export const arrayBufferToBase64 = (buffer:any) =>{
    const bytes = new Uint8Array(buffer);
    const base64 = Buffer.from(bytes).toString('base64');
    return base64;
  }


  export const base64ToFile = async (base64String:any, filePath:any) => {
    const data = Buffer.from(base64String, 'base64');
   fs.appendFileSync(filePath, data);
    const result = await upload_cloud(filePath);
    return result;
  }