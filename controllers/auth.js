const { createRandomRef, RemoveExtraSpace, validateEmail } = require("../helpers/utility")
const { Request, Response } = require('express')
const { Accounts, AccountType } = require("../models/account")
const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken");
const config = require('../config/configSetup')
const { emailVerifyTemplateData, userOnboardingTemplateData } = require("../service/mailer/templateData")
const { prepareMail } = require("../service/mailer/mailer")
const { Verify } = require("../models/verify")
const { Profiles } = require("../models/profile")
const {OAuth2Client} = require('google-auth-library')
const client = new  OAuth2Client(config.CLIENT_ID);

let serviceID = createRandomRef(12);
let code = String(Math.floor(100000 + Math.random() * 900000));
let time;
time += (3600 * 1000) * 87660


const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
// const admin = req.cookies.isadmin;


let currentDate = `${day}-${month}-${year}`;


 const register = async (req, res) => {
    

    const { email, password, username, type } = req.body;

    if (email === "" || password === ""|| username == "" || !email || !password || !username) {
        res.render('pages/sign-up', { message: "field cannot be empty" })
        console.log("field cannot be empty" );
    }

   else if (password.length <= 6) {

        res.render('pages/sign-up', { message: "password must be greater than 6 characters" })
        console.log("password must be greater than 6 characters" );

    }
  else  if (!validateEmail(RemoveExtraSpace(email))) {
        res.render('pages/sign-up', { message: "enter a valid email" })
        console.log("enter a valid email" );
    }else{

        const accountUser =	await Accounts.findAll({where: { email}});

        if (accountUser.length!=0) {
            return res.render('pages/sign-up', { message: "user already exsit" })
        }

        bcrypt.hash(password, config.saltRounds, async function (err, hashedPassword) {
            let insertData = { 
                email, password:hashedPassword, 
                username,
                type:type=="artist"?AccountType.ARTIST:AccountType.USER,
                join:currentDate
            };
    
            const account =	await Accounts.create(insertData);

            res.cookie("serviceID", serviceID, { expires: time })
            res.cookie("email", email,  { expires: time })

            const verify =	await Verify.create({code, serviceID});

            const { mailSubject, mailBody } = emailVerifyTemplateData({ otp:code, name:username});

            // prepare and send mail
            await prepareMail({
                mailRecipients: email,
                mailSubject,
                mailBody: mailBody,
                senderName: config.MAIL_FROM_NAME,
                senderEmail: config.MAIL_FROM,
            });

            
            res.redirect(`verify/${email}`);
		})
        console.log("account created successfuly" );
    }
    
};



 const resendCode =async (req, res) => {
      
    const serviceID = req.cookies.serviceID;
     const email = req.cookies.email;
     const account = await Accounts.findOne({where: {email}});
    const verify =	await Verify.create({code, serviceID});

    const { mailSubject, mailBody } = emailVerifyTemplateData({ otp:code, name :account.username});

    // prepare and send mail
    await prepareMail({
        mailRecipients: email,
        mailSubject,
        mailBody: mailBody,
        senderName: config.MAIL_FROM_NAME,
        senderEmail: config.MAIL_FROM,
    });

    
    res.redirect(`verify/${email}`);
}








 const confirmOtp = async (req, res) => {
     const serviceID = req.cookies.serviceID;
     const email = req.cookies.email;
     const { first, second, third, fourth, fifth, sixth } = req.body;
    const code = `${first}${second}${third}${fourth}${fifth}${sixth}`;

    const verify = await Verify.findOne({
        where:{
            serviceID: serviceID,
        }
      })

      if (verify){
        if (verify.code === code) {
           await verify.destroy();
           const account  = await Accounts.findOne({where: {email}});
           await account?.update({verified: true})
           if(account?.type == AccountType.ARTIST){
            res.redirect('/artist-setup')
           }else{
            res.redirect('/user-setup')
           }
       
        }else {
            res.render('pages/otp', {
                email,
                message: `invalid codes ${verify.code === code} ${verify.code} ${code}`,
          })
        }
      }else {
        res.render('pages/otp', {
            email,
            message: "code already used"
      })
      }

}



 const login = async (req, res) => {
    
    const { email, password } = req.body;

    if (email === "" || password === "" || !email || !password ) {
        res.render('pages/sign-in', { message: "field cannot be empty" })
    }
  
  else  if (!validateEmail(RemoveExtraSpace(email))) {
        res.render('pages/sign-in', { message: "enter a valid email" })
    }else{

        const accountUser =	await Accounts.findAll({where: { email}});

        if (accountUser.length==0) return res.render('pages/sign-in', { message: "user does not exist" })

     
        else {
            bcrypt.compare(password, accountUser[0].password).then(function (result) {
                if (!result) {
                    res.render('pages/sign-in', { message: "invalid credentials" })
                    //   res.status(400).send({ message: "invalid credentials" });
                }
                else {
                     res.cookie("id", accountUser[0].id)
                    let token = jwt.sign({ id: accountUser[0].id }, config.TOKEN_SECRET, {
                        expiresIn: "3600000000s",
                    });
                   
                     
                    res.render('pages/index', { message: "" })
                    //   res.status(400).send({ message: "invalid credentials" });
                }
            });
        }
       
    }
};



 const addUsersetUp = async (req, res) => {
    const {  businessName,
        jobTitle,
        businessType, 
        address, 
        phone, 
        cardNumber,
         cvv, 
         cardDate, 
         ipi,
         proName,
         pkaTitle,
          } = req.body;

      const email = req.cookies.email
        const accountUser =	await Accounts.findOne({where: { email}});
    
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
                   account: accountUser?.id,
                type:accountUser?.type==AccountType.ARTIST?AccountType.ARTIST:AccountType.USER,
            };
    
            const profile =	await Profiles.create(insertData);
            res.cookie("id", accountUser.id)


            const { mailSubject, mailBody } = userOnboardingTemplateData({ names: businessName, email,  type:accountUser?.type==AccountType.ARTIST?AccountType.ARTIST:AccountType.USER,});

            // prepare and send mail
            await prepareMail({
                mailRecipients: email,
                mailSubject,
                mailBody: mailBody,
                senderName: config.MAIL_FROM_NAME,
                senderEmail: config.MAIL_FROM,
            });

            
            res.render('pages/index', { message: "" })
		
    
    
};




 const getLogin = async (req, res) => {
    res.render('pages/sign-in', {message: "null"});
};


 const index = async (req, res) => {
    res.render('pages/index', {message: "null"});
};





 const getRegister = async (req, res) => {
    res.render('pages/sign-up', {message: "null"});
};


 const verify = async (req, res) => {
    const {email} = req.params;
    res.render('pages/otp', {
          email,
          message: "code sent to email"
    });
};


 const userSetup = async (req, res) => {
    const {email} = req.params;
    res.render('pages/form-validation', {
          email,
          message: "account creation successful"
    });
};



 const artistSetup = async (req, res) => {
    const {email} = req.params;
    res.render('pages/artist-profilesetup', {
          email,
          message: "account creation successful"
    });
};



 const login_google = async (req, res) => {
    let email = "";
    let password = "";
    let username = "";
    // let type: string = "user";

    const { token, type } = req.body;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        email = payload.email;
        password = payload.sub;
        username = payload.name;
        console.log(payload)

        if (email === "" || password === "" || !email || !password ) {
            res.send({message: false, data:"field cannot be empty"})
           
        }
      
      else  if (!validateEmail(RemoveExtraSpace(email))) {
        res.send({message: false, data:"email is not valid"})
        }else{
            const accountUser =	await Accounts.findAll({where: { email}});
            if (accountUser.length==0) {
                bcrypt.hash(password, config.saltRounds, async function (err, hashedPassword) {
                    let insertData = { 
                        email, password:hashedPassword, 
                        username,
                        type:type=="artist"?AccountType.ARTIST:AccountType.USER,
                        join:currentDate
                    };
                    const account =	await Accounts.create(insertData);
        
                    res.cookie("email", email,  { expires: time })
                    // res.cookie("id", accountUser[0].id)
                    
                    res.send({message: true, islogin: false, usertype: account.type, data:"registered successfully"})
                })
            }
    
            else {
                bcrypt.compare(password, accountUser[0].password).then(function (result) {
                    if (!result) {
                        res.send({message: false, data:"invalid password"})
                    }
                    else {
                        res.cookie("id", accountUser[0].id)
                        let token = jwt.sign({ id: accountUser[0].id }, config.TOKEN_SECRET, {
                            expiresIn: "3600000000s",
                        });
                        res.send({message: true, islogin: true, usertype: accountUser[0].type, data:"login successfully"})
                    }
                });
            }
           
        }
      }
      verify().catch(console.error);

};







module.exports = {
    getRegister,
    getLogin,
    register,
    verify,
    login_google,
    userSetup,
    confirmOtp,
    index,
    artistSetup,
    login,
    addUsersetUp,
    resendCode,
 
}