import { Request, Response } from 'express';


export const checkuser =  (req: Request, res: Response, next:any) => {
      if(req.cookies.id){
        next()
      }else{
        res.redirect('login');
      }

}