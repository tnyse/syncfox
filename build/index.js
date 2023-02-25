"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const configSetup_1 = __importDefault(require("./config/configSetup"));
// import { isAuthorized } from './helpers/middlewares';
// routes
// import routes from './routes';
// import adminRoutes from './routes/admin';
// import businessRoutes from './routes/business';
const db_1 = require("./controllers/db");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import routes from './routes';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
// PARSE JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ENABLE CORS AND START SERVER
app.use((0, cors_1.default)({ origin: true }));
app.set('view engine', 'ejs');
app.use(express_1.default.static(__dirname + '/public'));
(0, db_1.initDB)();
app.listen(configSetup_1.default.PORT, () => {
    console.log(`Server started on port ${configSetup_1.default.PORT}`);
});
// Routes
// app.all('*', isAuthorized);
app.use(routes_1.default);
// app.use('/admin', adminRoutes);
// app.use('/business', businessRoutes);
//# sourceMappingURL=index.js.map