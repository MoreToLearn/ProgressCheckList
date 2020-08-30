import Logger from "../index";
const MainLogger = new Logger("TESTS");

MainLogger.warn("This is a warning");
MainLogger.log("This is info");
MainLogger.error("This is an error");
