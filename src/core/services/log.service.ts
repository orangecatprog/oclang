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

export class LoggerService {
	private logs: Log[] = [];
	private config: LoggerConfig;

	constructor(config: LoggerConfig) {
		this.config = config;
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
}

export const defaultLoggerConfig: LoggerConfig = {
	interceptors: [],
	logs: [LogLevel.Debug, LogLevel.Info],
};
