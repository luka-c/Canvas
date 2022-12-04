"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
const app = (0, express_1.default)();
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'static')));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Canvas Clicker'
    });
});
if (externalUrl) {
    const hostname = '127.0.0.1';
    app.listen(port, hostname, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
    });
}
else {
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server locally running at http://localhost:${port}/`);
    });
}
