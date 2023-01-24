import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/configSetup';
// import { isAuthorized } from './helpers/middlewares';

// routes
// import routes from './routes';
// import adminRoutes from './routes/admin';
// import businessRoutes from './routes/business';
import { initDB } from './controllers/db';
import routes from './routes';
// import routes from './routes';

const app: Application = express();

app.use(morgan('dev'));

// PARSE JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENABLE CORS AND START SERVER
app.use(cors({ origin: true }));

app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
initDB();
app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
});

// Routes
// app.all('*', isAuthorized);
app.use(routes);
// app.use('/admin', adminRoutes);
// app.use('/business', businessRoutes);
