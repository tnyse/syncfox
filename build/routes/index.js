"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const routes = (0, express_1.Router)();
/*************************************************************************
API CALL START
*************************************************************************/
// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/login', auth_1.getLogin);
routes.get('/register', auth_1.getRegister);
routes.get('/index', auth_1.index);
routes.get('/verify/:email', auth_1.verify);
routes.get("/user-setup", auth_1.userSetup);
routes.get("/artist-setup", auth_1.artistSetup);
routes.post('/register', auth_1.register);
routes.post('/login', auth_1.login);
routes.post("/resend", auth_1.resendCode);
routes.post('/user-setup', auth_1.addUsersetUp);
routes.post('/confirm', auth_1.confirmOtp);
// routes.post('/upload-files/:dir?', uploads, uploadFile.single('file'), uploadFiles);
exports.default = routes;
//# sourceMappingURL=index.js.map