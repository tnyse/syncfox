// import { NextFunction, Request, Response } from 'express';
// import config from '../config/configSetup';
const cloudinary = require('cloudinary').v2
const multer = require("multer")
const  fs = require('fs')
const  path = require('path')


 const handleResponse = (res, statusCode, status, message, data) => {
	return res.status(statusCode).json({
		status,
		message,
		data,
	});
};

 const successResponse = (res, message = 'Operation successfull', data) => {
	return res.status(200).json({
		status: true,
		message,
		data,
	});
};

 const errorResponse = (res, messag = 'An error occured', data) => {
	return res.status(400).json({
		status: false,
		message,
		data,
	});
};


 const createRandomRef = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `txt_${result}`;
}





 const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


 const RemoveExtraSpace = (value) => {
    return value.replace(/\s+/g, ' ');
}





// cloudinary configuration
 cloudinary.config({
    cloud_name: 'dqth56myg',
    api_key: '774921177923962',
    api_secret: 'dDUKTJBycDHC4gjOKZ9UAHw8SAM'
  });
  
  
  
  
  
  
  
  
  const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './image')
    },
    filename: (req, file, cb) => {
      let filename = Date.now() + "--" + file.originalname;
      cb(null, filename.replace(/\s+/g, ''))
    }
  });


   const uploads = multer({
    storage: imageStorage,
  })


   const upload_cloud = async (path)=>{
	const result = await cloudinary.uploader.upload(path,  { resource_type: 'auto' })
	return result;
  }



   const arrayBufferToBase64 = (buffer) =>{
    const bytes = new Uint8Array(buffer);
    const base64 = Buffer.from(bytes).toString('base64');
    return base64;
  }


   const base64ToFile = async (base64String, filePath) => {
    const data = Buffer.from(base64String, 'base64');
   fs.appendFileSync(filePath, data);
    const result = await upload_cloud(filePath);
    return result;
  }

  module.exports = {
     base64ToFile,  arrayBufferToBase64, 
    upload_cloud,uploads,  imageStorage,
     RemoveExtraSpace, validateEmail,createRandomRef,
     errorResponse, handleResponse, successResponse,
     
    };