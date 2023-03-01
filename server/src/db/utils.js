/**
 * Run the insert callback ignoring specified Mongo errors.
 * @param {() => Promise} callback Operations with mongo.
 * @param {number | [number]} mongoErrors Mongo error codes to ignore.
 */
async function runIgnoreMongoErrors(callback, mongoErrors) {
  if (typeof (mongoErrors) === 'number') {
    mongoErrors = [mongoErrors];
  }

  try {
    await callback();
  } catch (e) {
    if (!mongoErrors.includes(e.code)) {
      throw e;
    }
  }
}


export default {
  runIgnoreMongoErrors
};

