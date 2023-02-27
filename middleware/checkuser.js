


 const checkuser =  (req, res, next) => {
      if(req.cookies.id){
        next()
      }else{
        res.redirect('login');
      }

}


module.exports = {checkuser}