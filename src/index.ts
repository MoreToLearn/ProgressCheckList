import backend from "./full/index";
import config from "../config.js";
import fs from "fs";

(() => {
    backend(config);
})();
