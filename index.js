import winston from 'winston';
import CloudWatchTransport from 'winston-aws-cloudwatch'

var NODE_ENV = process.env.NODE_ENV || 'development'

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            timestamp: true,
            colorize: true,
        })
    ]
});

var config = {
    logGroupName: 'test-log-group',
    logStreamName: NODE_ENV,
    createLogGroup: true,
    createLogStream: true,
    awsConfig: {
        accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
        region: process.env.CLOUDWATCH_REGION
    },
    formatLog: function (item) {
        return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
    }
}

if (NODE_ENV != 'development') {
    logger.add(new CloudWatchTransport(config))
}

logger.level = process.env.LOG_LEVEL || 'debug'
logger.stream = {
    write: function (message, encoding) {
        logger.info(message)
    }
};

export const handler = async (event, context) => {
    logger.defaultMeta = {requestId: context.awsRequestId}
    logger.log(logger.level, 'Hello World!');
    logger.error(new Error('This is a test error'));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Execution was successful',
            input: event,
        }),
    }
};