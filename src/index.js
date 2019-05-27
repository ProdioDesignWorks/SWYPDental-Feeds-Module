'use strict';
/**
 * This module provides access to the SWYPDental API
 * https://www.swypdental.com/
 *
 * The API provides access to recent news headlines
 * from many popular news sources.
 *
 * The author of this code has no formal relationship with SWYPDental.com and does not
 * claim to have created any of the facilities provided by SWYPDental.com.
 */

const axios = require('axios'),
  qs = require('querystring'),
  host = 'https://www.swypdental.com';

let API_KEY; // To be set by clients

class SWYPDentalAPI {
  constructor () {
    // if (!apiKey) throw new Error('No API key specified');
    // API_KEY = apiKey;

    //version based APIs
    // this.v1 = {
    //   topHeadlines (...args) {
    //     const { params = { language: 'en' }, options, cb } = splitArgsIntoOptionsAndCallback(args);
    //     const url = createUrlFromEndpointAndOptions('/v2/top-headlines', params);
    //     return getDataFromWeb(url, options, API_KEY, cb);
    //   },
    // }
  }

  getAPIKey (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/developers/account', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getArchivedFeeds (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/feeds/archived', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getDailyDigestFeeds (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/feeds/daily-digest', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getSWYPCategories (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/categories/list', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getCategorizedFeeds (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/categories/{CATEGORY_ID}/feeds', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getBrandedMagazines (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/magazines/list', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getBrandedMagazinesFeeds (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/magazines/{MAGAZINE_ID}/feeds', params);
    return getDataFromWeb(url, options, null, cb);
  }

  getSWYPOriginalFeeds (...args) {
    const { params, options, cb } = splitArgsIntoOptionsAndCallback(args);
    const url = createUrlFromEndpointAndOptions('/swyp/feeds/swyp-originals', params);
    return getDataFromWeb(url, options, null, cb);
  }

}

class SWYPDentalAPIError extends Error {
  constructor(err) {
    super();
    this.name = `SWYPDentalAPIError: ${err.code}`;
    this.message = err.message;
  }
}

/**
 * Takes a variable-length array that represents arguments to a function and attempts to split it into
 * an 'options' object and a 'cb' callback function.
 * @param {Array}   args The arguments to the function
 * @return {Object}
 */
function splitArgsIntoOptionsAndCallback (args) {
  let params;
  let options;
  let cb;
  if (args.length > 1) {
    const possibleCb = args[args.length - 1];
    if ('function' === typeof possibleCb) {
      cb = possibleCb;
      options = args.length === 3 ? args[1] : undefined;
    } else {
      options = args[1];
    }
    params = args[0];
  } else if ('object' === typeof args[0]) {
    params = args[0];
  } else if ('function' === typeof args[0]) {
    cb = args[0];
  }
  return { params, options, cb };
}

/**
 * Creates a url string from an endpoint and an options object by appending the endpoint
 * to the global "host" const and appending the options as querystring parameters.
 * @param {String} endpoint
 * @param {Object} [options]
 * @return {String}
 */
function createUrlFromEndpointAndOptions (endpoint, options) {
  const query = qs.stringify(options);
  const baseURL = `${host}${endpoint}`;
  return query ? `${baseURL}?${query}` : baseURL;
}

/**
 * Takes a URL string and returns a Promise containing
 * a buffer with the data from the web.
 * @param  {String} url      A URL String
 * @param  {String} apiKey   (Optional) A key to be used for authentication
 * @return {Promise<Buffer>} A Promise containing a Buffer
 */
function getDataFromWeb(url, options, apiKey, cb) {
  let useCallback = 'function' === typeof cb;
  const reqOptions = { headers: {} };
  if (apiKey) {
    reqOptions.headers['X-Api-Key'] = apiKey;
  }
  if (options && options.noCache === true) {
    reqOptions.headers['X-No-Cache'] = 'true';
  }
  return axios(url, reqOptions).then(res => Promise.all([res, res.json()])).then(([res, body]) => {
    if (body.status === 'error') throw new SWYPDentalAPIError(body);
    // 'showHeaders' option can be used for clients to debug response headers
    // response will be in form of { headers, body }
    if (options && options.showHeaders) {
      if (useCallback) return cb(null, { headers: res.headers, body });
      return { headers: res.headers, body };
    }
    if (useCallback) return cb(null, body);
    return body;
  }).catch(err => {
    if (useCallback) return cb(err);
    throw err;
  });
}

module.exports = SWYPDentalAPI;
