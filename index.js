import winston from 'winston';

var NODE_ENV = process.env.NODE_ENV || 'development'

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
});

export const handler = async (event, context) => {
    logger.defaultMeta = {requestId: context.awsRequestId}
    logger.silly('This message is not supposed to be seen in CloudWatch')
    logger.log(logger.level, 'Hello World!');
    logger.error('This is an error');
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Execution was successful',
        }),
    }
};