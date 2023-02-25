"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistSetup = exports.userSetup = exports.verify = exports.getRegister = exports.index = exports.getLogin = exports.addUsersetUp = exports.login = exports.confirmOtp = exports.resendCode = exports.register = void 0;
const utility_1 = require("../helpers/utility");
const account_1 = require("../models/account");
const bcrypt_1 = __importDefault(require("bcrypt"));
var jwt = require("jsonwebtoken");
const configSetup_1 = __importDefault(require("../config/configSetup"));
const templateData_1 = require("../service/mailer/templateData");
const mailer_1 = require("../service/mailer/mailer");
const verify_1 = require("../models/verify");
const profile_1 = require("../models/profile");
let serviceID = (0, utility_1.createRandomRef)(12);
let code = String(Math.floor(100000 + Math.random() * 900000));
let time;
time += (3600 * 1000) * 87660;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // const admin = req.cookies.isadmin;
    let currentDate = `${day}-${month}-${year}`;
    const { email, password, username, type } = req.body;
    if (email === "" || password === "" || username == "" || !email || !password || !username) {
        res.render('pages/sign-up', { message: "field cannot be empty" });
        console.log("field cannot be empty");
    }
    else if (password.length <= 6) {
        res.render('pages/sign-up', { message: "password must be greater than 6 characters" });
        console.log("password must be greater than 6 characters");
    }
    else if (!(0, utility_1.validateEmail)((0, utility_1.RemoveExtraSpace)(email))) {
        res.render('pages/sign-up', { message: "enter a valid email" });
        console.log("enter a valid email");
    }
    else {
        const accountUser = yield account_1.Accounts.findAll({ where: { email } });
        if (accountUser.length != 0) {
            return res.render('pages/sign-up', { message: "user already exsit" });
        }
        bcrypt_1.default.hash(password, configSetup_1.default.saltRounds, function (err, hashedPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                let insertData = {
                    email, password: hashedPassword,
                    username,
                    type: type == "artist" ? account_1.AccountType.ARTIST : account_1.AccountType.USER,
                    join: currentDate
                };
                const account = yield account_1.Accounts.create(insertData);
                res.cookie("serviceID", serviceID, { expires: time });
                res.cookie("email", email, { expires: time });
                const verify = yield verify_1.Verify.create({ code, serviceID });
                const { mailSubject, mailBody } = (0, templateData_1.emailVerifyTemplateData)({ otp: code, name: username });
                // prepare and send mail
                yield (0, mailer_1.prepareMail)({
                    mailRecipients: email,
                    mailSubject,
                    mailBody: mailBody,
                    senderName: configSetup_1.default.MAIL_FROM_NAME,
                    senderEmail: configSetup_1.default.MAIL_FROM,
                });
                res.redirect(`verify/${email}`);
            });
        });
        console.log("account created successfuly");
    }
});
exports.register = register;
const resendCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceID = req.cookies.serviceID;
    const email = req.cookies.email;
    const account = yield account_1.Accounts.findOne({ where: { email } });
    const verify = yield verify_1.Verify.create({ code, serviceID });
    const { mailSubject, mailBody } = (0, templateData_1.emailVerifyTemplateData)({ otp: code, name: account === null || account === void 0 ? void 0 : account.username });
    // prepare and send mail
    yield (0, mailer_1.prepareMail)({
        mailRecipients: email,
        mailSubject,
        mailBody: mailBody,
        senderName: configSetup_1.default.MAIL_FROM_NAME,
        senderEmail: configSetup_1.default.MAIL_FROM,
    });
    res.redirect(`verify/${email}`);
});
exports.resendCode = resendCode;
const confirmOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceID = req.cookies.serviceID;
    const email = req.cookies.email;
    const { first, second, third, fourth, fifth, sixth } = req.body;
    const code = `${first}${second}${third}${fourth}${fifth}${sixth}`;
    const verify = yield verify_1.Verify.findOne({
        where: {
            serviceID: serviceID,
        }
    });
    if (verify) {
        if (verify.code === code) {
            yield verify.destroy();
            const account = yield account_1.Accounts.findOne({ where: { email } });
            yield (account === null || account === void 0 ? void 0 : account.update({ verified: true }));
            if ((account === null || account === void 0 ? void 0 : account.type) == account_1.AccountType.ARTIST) {
                res.redirect('/artist-setup');
            }
            else {
                res.redirect('/user-setup');
            }
        }
        else {
            res.render('pages/otp', {
                email,
                message: `invalid codes ${verify.code === code} ${verify.code} ${code}`,
            });
        }
    }
    else {
        res.render('pages/otp', {
            email,
            message: "code already used"
        });
    }
});
exports.confirmOtp = confirmOtp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email === "" || password === "" || !email || !password) {
        res.render('pages/sign-in', { message: "field cannot be empty" });
    }
    else if (!(0, utility_1.validateEmail)((0, utility_1.RemoveExtraSpace)(email))) {
        res.render('pages/sign-in', { message: "enter a valid email" });
    }
    else {
        const accountUser = yield account_1.Accounts.findAll({ where: { email } });
        if (accountUser.length == 0)
            return res.render('pages/sign-in', { message: "user does not exist" });
        else {
            bcrypt_1.default.compare(password, accountUser[0].password).then(function (result) {
                if (!result) {
                    res.render('pages/sign-in', { message: "invalid credentials" });
                    //   res.status(400).send({ message: "invalid credentials" });
                }
                else {
                    let token = jwt.sign({ id: accountUser[0].id }, configSetup_1.default.TOKEN_SECRET, {
                        expiresIn: "3600000000s",
                    });
                    res.render('pages/index', { message: "" });
                    //   res.status(400).send({ message: "invalid credentials" });
                }
            });
        }
    }
});
exports.login = login;
const addUsersetUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, jobTitle, businessType, address, phone, cardNumber, cvv, cardDate, ipi, proName, pkaTitle, } = req.body;
    const email = req.cookies.email;
    const accountUser = yield account_1.Accounts.findOne({ where: { email } });
    let insertData = {
        ipi,
        proName,
        pkaTitle,
        businessName,
        jobTitle,
        businessType,
        address,
        phone,
        cardNumber,
        cvv,
        cardDate,
        account: accountUser === null || accountUser === void 0 ? void 0 : accountUser.id,
        type: (accountUser === null || accountUser === void 0 ? void 0 : accountUser.type) == account_1.AccountType.ARTIST ? account_1.AccountType.ARTIST : account_1.AccountType.USER,
    };
    const profile = yield profile_1.Profiles.create(insertData);
    const { mailSubject, mailBody } = (0, templateData_1.userOnboardingTemplateData)({ names: businessName, email, type: (accountUser === null || accountUser === void 0 ? void 0 : accountUser.type) == account_1.AccountType.ARTIST ? account_1.AccountType.ARTIST : account_1.AccountType.USER, });
    // prepare and send mail
    yield (0, mailer_1.prepareMail)({
        mailRecipients: email,
        mailSubject,
        mailBody: mailBody,
        senderName: configSetup_1.default.MAIL_FROM_NAME,
        senderEmail: configSetup_1.default.MAIL_FROM,
    });
    res.render('pages/index', { message: "" });
});
exports.addUsersetUp = addUsersetUp;
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('pages/sign-in', { message: "null" });
});
exports.getLogin = getLogin;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('pages/index', { message: "null" });
});
exports.index = index;
const getRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('pages/sign-up', { message: "null" });
});
exports.getRegister = getRegister;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    res.render('pages/otp', {
        email,
        message: "code sent to email"
    });
});
exports.verify = verify;
const userSetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    res.render('pages/form-validation', {
        email,
        message: "account creation successful"
    });
});
exports.userSetup = userSetup;
const artistSetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    res.render('pages/artist-profilesetup', {
        email,
        message: "account creation successful"
    });
});
exports.artistSetup = artistSetup;
exports.default = {
    getRegister: exports.getRegister,
    getLogin: exports.getLogin,
    register: exports.register,
    verify: exports.verify,
    userSetup: exports.userSetup,
    confirmOtp: exports.confirmOtp,
    addUsersetUp: exports.addUsersetUp,
    resendCode: exports.resendCode,
};
//# sourceMappingURL=auth.js.map