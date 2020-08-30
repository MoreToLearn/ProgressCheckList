const dotenv = require("dotenv");
dotenv.config({
    path: `${__dirname}/.env`
});
let Config = {};
const settings = [{
        "name": "domain",
        "required": true,
        "description": "Please provide a domain"
    },
    {
        "name": "backend_port",
        "required": true,
        "description": "This is the port that the backend will run on"
    },
    {
        "name": "protocol",
        "required": false,
        "default": "http"
    }
]
settings.forEach(x => {
    const extracted = process.env[x.name];
    if (!extracted && x.required) throw new Error(`The setting ${x.name} was not found. ${x.description ? x.description : ""}`);
    Config[x.name] = extracted || x.default
})
module.exports = Config;