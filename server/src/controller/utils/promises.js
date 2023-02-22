/**
 * Stop execution for some time.
 *
 * @param {number} seconds Duration to sleep.
 * @returns {Promise<void>} Promise to `await` for sleep.
 */
async function sleep(seconds) {
  return new Promise((res) => setTimeout(res, seconds * 1000));
}


/**
 * Generate and resolve promises sequentially with delay.
 *
 * @template T Result of the promise.
 * @param {[() => Promise<T>]} promiseCallbacks Generators for promises to resolve.
 * @param {number} delay Delay between resolves (in seconds).
 * @returns {Promise<T[]>} Resolved promises.
 */
async function throttleResolve(promiseCallbacks, delay = 0) {
  const results = [];
  for (const pc of promiseCallbacks) {
    results.push(await pc());
    await sleep(delay);
  }
  return results;
}

export default {
  sleep,
  throttleResolve
};

