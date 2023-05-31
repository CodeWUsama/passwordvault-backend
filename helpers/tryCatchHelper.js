import sendResponse from './responseHelper.js';

const tryCatchWrapper = (executable) => async (...args) => {
  try {
    const result = await executable(...args);
    return result;
  } catch (error) {
    sendResponse(args.res, {}, error.message);
  }
};

export default tryCatchWrapper;
