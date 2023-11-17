import XPError from '../../classes/xp-error';
import { replace, split } from 'lodash';

export default (error: XPError) => {
  const originalTrace = `${split(error.stack, '\n    ')[1]}`;
  const regex = /at\s(.*?)\s\[(.*?)\]\s\((.*?)\)/;
  const match = originalTrace.match(regex);

  if (match) {
    const [, functionName, functionDescription, filePath] = match;
    const relativeFilePath = replace(filePath, /^(.*?\/src)/, '/src');
    return `${functionName} [as ${functionDescription}] (${relativeFilePath})`;
  }

  return originalTrace;
};
