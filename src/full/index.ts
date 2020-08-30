import express from "express";
import Logger from "../logger/index";
import * as bodyParser from "body-parser";
import DatabaseManager from "../database/DatabaseManager";
const AppLogger = new Logger("backend");
const app = express();

app.logger = AppLogger;
app.database = new DatabaseManager();
app.use("/assets", express.static(`${__dirname}/assets`));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

import lists from "./routes/lists";
app.use("/lists", lists);

import note from "./routes/notes";
app.use("/notes", note);

app.get("/", (req, res) => {
    return res.sendFile("index.html");
});

app.use(function (err, req, res, next) {
    if (!process.env.PRODUCTION) console.log(err);
    if (err) {
        if (req.method === "POST") {
            return err.status
                ? res.status(err.status).json({
                      error: true,
                      message: err.message,
                  })
                : res.json({
                      error: true,
                      message: err.message,
                  });
        } else {
            return res.render("error", {
                error: err.message,
            });
        }
    }
    return next();
});

app.use("*", (req, res) => {
    return res.status(404).json({
        error: true,
        message: "That resource does not exist",
        global: true,
    });
});

export default function backend(config) {
    app.listen(config.backend_port, "0.0.0.0", async () => {
        app.logger.log(
            `Server started on port ${config.backend_port} at url: ${config.protocol}://${config.domain}:${config.backend_port}`,
        );
    });
}
