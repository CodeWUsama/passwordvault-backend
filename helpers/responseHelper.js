import RESPONSE_CODES from '../constants/responseCodes.js';

const sendResponse = (res, data, error, responseCode) => {
  if (error) {
    res.send({
      payload: {},
      message: error,
      response_code: responseCode || RESPONSE_CODES.serverError,
    });
  } else {
    res.send({ payload: data || {}, response_code: RESPONSE_CODES.ok });
  }
};

export default sendResponse;
