const winston = require('winston');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

/**
 * @description :: module for creating the logger with "info" default log level.
 */

const logDir = config.LOG_CONFIG.location;
const appLogConfig = config.LOG_CONFIG.fileLogConfig;

appLogConfig.filename = logDir + '/' + appLogConfig.filename;
appLogConfig.level = appLogConfig.level;

const transports = [];
transports.push(new winston.transports.File(appLogConfig));
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}
if(config.LOG_CONFIG.enableConsoleLog) {
	let consoleLogConfig = config.LOG_CONFIG.consoleLogConfig;
	transports.push(new winston.transports.Console(consoleLogConfig));
}
const logger = winston.createLogger({
	transports: transports,
	exitOnError: false
});

module.exports = logger;
