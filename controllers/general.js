import sendResponse from '../helpers/responseHelper.js';
import RESPONSE_CODES from '../constants/responseCodes.js';

export const getResponseCodes = (req, res) => {
  try {
    sendResponse(res, RESPONSE_CODES);
  } catch (error) {
    sendResponse(res, null, error);
  }
};
