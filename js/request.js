import qs from 'qs';

const query = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

const getRequest = new Promise(res => window.AP.require('request', res));

export const getQuery = val => query[val];

export default function makeRequest(opts) {
  return new Promise((resolve, reject) => {
    getRequest.then(request =>
      request({
        ...opts,
        success: resolve,
        error: reject,
      })
    );
  });
}
