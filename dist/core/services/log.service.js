import * as gctx from "../../shared/context/globalContext.js";
export var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "DEBUG";
    LogLevel["Info"] = "INFO";
    LogLevel["Warning"] = "WARNING";
    LogLevel["Error"] = "ERROR";
})(LogLevel || (LogLevel = {}));
export const defaultLoggerConfig = {
    interceptors: [],
    logs: [LogLevel.Debug, LogLevel.Info],
};
export class LoggerService {
    logs = [];
    config;
    logFilePath;
    constructor(config) {
        this.config = config;
        if (gctx.get("isProject")) {
            this.logFilePath = gctx.get("projectPath") + "/.ocat/logs.txt";
        }
        else {
            this.logFilePath = null;
        }
    }
    log(message, level = LogLevel.Info, printMsg = message) {
        this.logs.push({ message, level });
        this.config.interceptors.forEach((interceptor) => {
            if (interceptor.level === level) {
                message = interceptor.onLog(message);
            }
        });
        console.log(printMsg);
    }
    debug(message) {
        this.log(message, LogLevel.Debug);
    }
    info(message) {
        this.log(message, LogLevel.Info);
    }
    warning(message) {
        this.log(message, LogLevel.Warning);
    }
    error(message) {
        this.log(message, LogLevel.Error);
    }
    getLogs() {
        return this.logs;
    }
    pushInterceptor(interceptor) {
        this.config.interceptors.push(interceptor);
    }
    removeInterceptor(interceptor) {
        this.config.interceptors = this.config.interceptors.filter((i) => i !== interceptor);
    }
    toString() {
        return this.logs
            .map((log) => `[${log.level}] ${log.message}`)
            .join("\n");
    }
    static register(config = defaultLoggerConfig) {
        gctx.pushService(new LoggerService(config), "log");
    }
}
