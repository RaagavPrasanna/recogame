import { csrfSync } from 'csrf-sync';

const csrfProtect = csrfSync();

function isAuthenticated(req, res, next) {
  if(!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

// Documentation
// eslint-disable-next-line no-unused-vars
class Validation {
  /** @type {boolean?} Whether the value should be an int. */
  int;
  /** @type {number?} Minimum bound (inclusive). */
  min;
  /** @type {number?} Maximum bound (exclusive). */
  max;
}

/**
 * Validate a value to be a number, in bounds and optionally an int.
 *
 * @param {any} value Value to validate.
 * @param {Validation?} validation Validation conditions.
 * @throws If the value isn't a valid number.
 */
function validateNumber(value, validation) {
  if (isNaN(value)) {
    throw new Error(`${value} is not a number`);
  }
  value = Number(value);
  if (validation?.int !== null && validation?.int && !Number.isInteger(value)) {
    throw new Error(`${value} is not an integer`);
  }
  if (validation?.min !== null && value < validation?.min) {
    throw new Error(`${value} cannot be less than ${validation?.min} (inclusive)`);
  }
  if (validation?.max !== null && value >= validation?.max) {
    throw new Error(`${value} cannot be greater than ${validation?.max} (exclusive)`);
  }
}


export default {
  authentication: {
    isAuthenticated,
    csrfProtect
  },
  validation: {
    validateNumber
  }
};

