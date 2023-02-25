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
exports.prepareMail = exports.sendMail = void 0;
// Import packages
const nodemailer_1 = __importDefault(require("nodemailer"));
const configSetup_1 = __importDefault(require("../../config/configSetup"));
const transporter = nodemailer_1.default.createTransport({
    host: "cabrequestservices.com",
    port: 465,
    auth: {
        user: configSetup_1.default.MAIL_FROM,
        pass: "akpGq.TF7G(X"
    }
});
const sendMail = ({ senderName, senderEmail, mailRecipients, mailSubject, mailBody, mailAttachments }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mailOptions = {
            from: senderEmail,
            to: mailRecipients,
            subject: mailSubject,
            html: mailBody
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            }
            else {
                console.log(data);
                return {
                    status: true,
                    message: 'Email sent successfully',
                };
            }
        });
    }
    catch (error) {
        console.log(JSON.stringify(error));
        return {
            status: false,
            message: `Email not sent ${error}`,
            email: mailRecipients,
        };
    }
});
exports.sendMail = sendMail;
const prepareMail = ({ mailRecipients, mailSubject, mailBody, senderName, senderEmail }) => __awaiter(void 0, void 0, void 0, function* () {
    const _sendMail = yield (0, exports.sendMail)({
        senderName,
        senderEmail,
        mailRecipients,
        mailSubject,
        mailBody,
    });
    console.log(_sendMail);
    // statuss: _sendMail.status, message: _sendMail.message 
    return {};
});
exports.prepareMail = prepareMail;
//# sourceMappingURL=mailer.js.map