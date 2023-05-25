// Import packages

const { addUsersetUp,  artistSetup, confirmOtp, getLogin,home,detail,homecreate, getRegister, index, login, login_google, register, resendCode, userSetup, verify,  } = require('../controllers/auth');
const { filemedia, getupload,adminRequestDetail, adminRequest, requestDetail,userRequest, musicform, upload, uploadmusicform,search, musicplayer,audiotest, test, request, sendRequest } = require('../controllers/music');
const { uploads } = require('../helpers/utility');
const { checkuser } = require('../middleware/checkuser');

const express = require('express');
const routes = express.Router();

/*************************************************************************
API CALL START
*************************************************************************/

// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/login', getLogin);
// routes.get('/', home);
routes.get('/', index);
routes.get('/detail', detail);
routes.get('/register', getRegister);
routes.get('/index', home);
routes.get('/verify/:email', verify);
routes.get("/user-setup", userSetup)
routes.get("/artist-setup", artistSetup)
routes.get("/upload",checkuser, getupload)
routes.get("/musicform", musicform)
routes.get("/filemedia", filemedia)
routes.get("/request", checkuser,request);
routes.get("/musicplayer", musicplayer)
routes.get("/search", search)
routes.get("/user-request", userRequest);
routes.get("/audiotest", audiotest)
routes.get("/request-detail", requestDetail)
routes.get("/admin-request-detail", adminRequestDetail)
routes.get("/admin-request", adminRequest)






routes.post('/', homecreate);
routes.post('/register', register);
routes.post('/musicform', uploadmusicform);
routes.post('/login', login);
routes.post("/upload", uploads.single("file"), upload)
routes.post("/resend", resendCode);
routes.post("/google_login", login_google)
routes.post('/user-setup', addUsersetUp);
routes.post("/request", sendRequest)
routes.post('/confirm', confirmOtp);




// routes.post('/upload-files/:dir?', uploads, uploadFile.single('file'), uploadFiles);



module.exports = routes;
