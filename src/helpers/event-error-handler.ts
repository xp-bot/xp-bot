import getSanatisedStacktrace from './error-handling/get-sanatised-stacktrace';
import XPError from '../classes/xp-error';
import * as Sentry from '@sentry/node';
import { toUpper, upperCase } from 'lodash';

export default (event: string, callback: () => Promise<void>) => {
  console.debug(`[EVENT: ${toUpper(event)}] Recieved event request`);
  callback()
    .then(() => {
      console.debug(
        `[EVENT: ${toUpper(event)}] Successfully processed event [${event}]`,
      );
    })
    .catch((error: XPError) => {
      Sentry.captureException(error);
      console.error(
        `[EVENT: ${toUpper(event)}] ${
          error.message
        } - '${getSanatisedStacktrace(error)}'`,
      );
    });
};
