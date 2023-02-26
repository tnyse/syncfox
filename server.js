const app = require('./server');
const http = require('http');

http.createServer(app).listen(process.env.PORT);