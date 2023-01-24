// Import packages
import { Router } from 'express';
import { getLogin, getRegister, register,  } from '../controllers/auth';

const routes = Router();

/*************************************************************************
API CALL START
*************************************************************************/

// INDEX ROUTE TO SHOW API IS WORKING FINE
routes.get('/login', getLogin);
routes.get('/register', getRegister);

routes.post('/register', register);
// routes.post('/login', userRouteValidation('/login'), preLogin);



// routes.post('/upload-files/:dir?', uploads, uploadFile.single('file'), uploadFiles);


export default routes;
