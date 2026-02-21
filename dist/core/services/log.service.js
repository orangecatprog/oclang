export var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "DEBUG";
    LogLevel["Info"] = "INFO";
    LogLevel["Warning"] = "WARNING";
    LogLevel["Error"] = "ERROR";
})(LogLevel || (LogLevel = {}));
export class LoggerService {
    logs = [];
    config;
    constructor(config) {
        this.config = config;
    }
    log(message, level = LogLevel.Info) {
        this.logs.push({ message, level });
        this.config.interceptors.forEach(interceptor => {
            if (interceptor.level === level) {
                message = interceptor.onLog(message);
            }
        });
        if (this.config.logs.includes(level)) {
            console.log(message);
        }
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
        this.config.interceptors = this.config.interceptors.filter(i => i !== interceptor);
    }
    toString() {
        return this.logs.map(log => `[${log.level}] ${log.message}`).join("\n");
    }
}
export const defaultLoggerConfig = {
    interceptors: [],
    logs: [LogLevel.Debug, LogLevel.Info],
};
