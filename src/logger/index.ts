export default class Logger {
    constructor(public serverType: string) {}
    base(type: string, value: string, color = "") {
        return console.log(
            color,
            `[${new Date().toLocaleTimeString()} | ${new Date().toLocaleDateString()}] [MORETOLEARN] [${
                this.serverType
            }] [${type}]: ${value}`,
            "\x1b[0m",
        );
    }
    log(value: string) {
        return this.base("info", value, "\x1b[32m");
    }
    warn(value: string) {
        return this.base("warn", value, "\x1b[33m");
    }
    error(value: string) {
        return this.base("error", value, "\x1b[31m");
    }
}
