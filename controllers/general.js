import sendResponse from '../helpers/responseHelper.js';
import RESPONSE_CODES from '../constants/responseCodes.js';

const getResponseCodes = (req, res) => {
  sendResponse(res, RESPONSE_CODES);
};

export default getResponseCodes;
