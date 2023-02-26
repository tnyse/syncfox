const  express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {config} = require('./config/configSetup');
// import { isAuthorized } from './helpers/middlewares';

// routes

const { initDB } = require('./controllers/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser())

// PARSE JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// PARSE JSON
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

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
