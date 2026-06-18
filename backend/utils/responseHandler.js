/**
 * ============================================================
 *  responseHandler.js
 * ============================================================
 * Why this file exists:
 * Every API in a professional backend should send responses
 * in a CONSISTENT shape. If every controller writes its own
 * res.json({...}) with different formats, the frontend has to
 * guess what each endpoint returns.
 *
 * By using successResponse() and errorResponse() everywhere,
 * our React frontend can always expect:
 *
 *   { success: true,  message: "...", data: {...} }
 *   { success: false, message: "...", errors: [...] }
 *
 * This makes the Axios calls on the frontend predictable and
 * easy to handle (e.g. "if (response.data.success) {...}").
 * ============================================================
 */

/**
 * Send a successful response.
 *
 * @param {object} res - Express response object
 * @param {string} message - Human readable success message
 * @param {object} data - Payload to send back to the frontend
 * @param {number} statusCode - HTTP status code (default 200)
 */
function successResponse(res, message = "Success", data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Send an error response.
 *
 * @param {object} res - Express response object
 * @param {string} message - Human readable error message
 * @param {number} statusCode - HTTP status code (default 400)
 * @param {array} errors - Optional array of detailed error messages
 *                          (useful for validation errors)
 */
function errorResponse(res, message = "Something went wrong", statusCode = 400, errors = []) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

module.exports = {
  successResponse,
  errorResponse,
};
