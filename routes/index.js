// Import packages

const { addUsersetUp, artistSetup, confirmOtp, getLogin, getRegister, index, login, login_google, register, resendCode, userSetup, verify,  } = require('../controllers/auth');
const { filemedia, getupload, musicform, upload, uploadmusicform,search, musicplayer,audiotest, test } = require('../controllers/music');
const { uploads } = require('../helpers/utility');
const { checkuser } = require('../middleware/checkuser');

const express = require('express');
const routes = express.Router();

/*************************************************************************
API CALL START
*************************************************************************/

// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/login', getLogin);
routes.get('/', getLogin);
routes.get('/register', getRegister);
routes.get('/index', index);
routes.get('/verify/:email', verify);
routes.get("/user-setup", userSetup)
routes.get("/artist-setup", artistSetup)
routes.get("/upload",checkuser, getupload)
routes.get("/musicform", musicform)
routes.get("/filemedia", filemedia)
routes.get("/musicplayer", musicplayer)
routes.get("/search", search)
routes.get("/audiotest", audiotest)






routes.post('/register', register);
routes.post('/musicform', uploadmusicform);
routes.post('/login', login);
routes.post("/upload", uploads.single("file"), upload)
routes.post("/resend", resendCode);
routes.post("/google_login", login_google)
routes.post('/user-setup', addUsersetUp);
routes.post('/confirm', confirmOtp);




// routes.post('/upload-files/:dir?', uploads, uploadFile.single('file'), uploadFiles);



module.exports = routes;
