import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
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