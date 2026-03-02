import * as gctx from "../../shared/context/globalContext.js";

export enum LogLevel {
	Debug = "DEBUG",
	Info = "INFO",
	Warning = "WARNING",
	Error = "ERROR",
}

export interface Log {
	message: string;
	level: LogLevel;
}

export interface LoggerConfig {
	interceptors: {
		onLog: (message: string) => string;
		level: LogLevel;
	}[];
	logs: LogLevel[];
}

export const defaultLoggerConfig: LoggerConfig = {
	interceptors: [],
	logs: [LogLevel.Debug, LogLevel.Info],
};

export class LoggerService {
	private logs: Log[] = [];
	private config: LoggerConfig;
	public logFilePath: string | null;

	constructor(config: LoggerConfig) {
		this.config = config;
		if (gctx.get("isProject")) {
			this.logFilePath = gctx.get("projectPath") + "/.ocat/logs.txt";
		} else {
			this.logFilePath = null
		}
	}

	log(message: string, level: LogLevel = LogLevel.Info, printMsg: string = message) {
		this.logs.push({ message, level });
		this.config.interceptors.forEach((interceptor) => {
			if (interceptor.level === level) {
				message = interceptor.onLog(message);
			}
		});
		console.log(printMsg);
	}

	debug(message: string) {
		this.log(message, LogLevel.Debug);
	}

	info(message: string) {
		this.log(message, LogLevel.Info);
	}

	warning(message: string) {
		this.log(message, LogLevel.Warning);
	}

	error(message: string) {
		this.log(message, LogLevel.Error);
	}

	getLogs() {
		return this.logs;
	}

	pushInterceptor(interceptor: {
		onLog: (message: string) => string;
		level: LogLevel;
	}) {
		this.config.interceptors.push(interceptor);
	}

	removeInterceptor(interceptor: {
		onLog: (message: string) => string;
		level: LogLevel;
	}) {
		this.config.interceptors = this.config.interceptors.filter(
			(i) => i !== interceptor,
		);
	}

	toString() {
		return this.logs
			.map((log) => `[${log.level}] ${log.message}`)
			.join("\n");
	}

	static register(config: LoggerConfig = defaultLoggerConfig) {
		gctx.pushService(new LoggerService(config), "log");
	}
}