import sendResponse from './responseHelper.js';

const tryCatchWrapper = (executable) => async (req, res, next) => {
  try {
    const result = await executable(req, res, next);
    return result;
  } catch (error) {
    console.log(error);
    sendResponse(res, {}, error.message);
  }
};

export default tryCatchWrapper;
