import { RemoveExtraSpace, validateEmail } from "../helpers/utility";
import { Request, Response } from 'express';
import { Accounts } from "../models/account";
import bcrypt from "bcrypt";
const saltRounds = 10;


export const register = async (req: Request, res: Response) => {
    
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    const { email, password, username } = req.body;

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

        if (accountUser.length!=0) return res.render('pages/sign-up', { message: "user already exsit" })

        bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
            let insertData: any = { 
                email, password:hashedPassword, 
                username,
                join:currentDate
            };
    
            const account =	await Accounts.create(insertData);
            res.render('pages/index', { message: "account created successfuly" })
		})
        console.log("account created successfuly" );
       
    }
};




export const login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    if (email === "" || password === "" || !email || !password) {
        res.render('pages/sign-in', { message: "field cannot be empty" })
        //   res.status(400).send({ message: "field cannot be empty" });
    }
    if (!validateEmail(RemoveExtraSpace(email))) {
        res.render('pages/sign-in', { message: "enter a valid email" })
        //   res.status(400).send({ message: "enter a valid email" });
    }
   const user =await Accounts.findAll({ where: { email: email} })

   if (user.length == 0) {
    res.render('pages/sign-in', { message: "user does not exist" })
    //   res.status(400).send({ message: "invalid credentials" });
}

else {
    bcrypt.compare(password, user[0].password).then(function (result) {
        if (!result) {
            res.render('pages/sign-in', { message: "invalid credentials" })
            //   res.status(400).send({ message: "invalid credentials" });
        }
        else {
            res.render('pages/sign-in', { message: "loged in" })
        }
    });
}
       
};





export const getLogin = async (req: Request, res: Response) => {
    res.render('pages/sign-in', {message: "null"});
};


export const getRegister = async (req: Request, res: Response) => {
    res.render('pages/sign-up', {message: "null"});
};



export default {
    getRegister,
    getLogin,
    register
}