import pino from 'pino';

export default () => {
  const logger = pino({
    level: process.env.LOG_LEVEL || 'debug',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log = (message: string, ...args: any[]) => {
    logger.info(message, args);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.debug = (message: string, ...args: any[]) => {
    logger.debug(message, args);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (message: string, ...args: any[]) => {
    logger.error(message, args);
  };
};
