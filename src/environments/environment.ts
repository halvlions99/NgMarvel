// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  marvelApiUrl: 'http://gateway.marvel.com/v1/public/',
  marvelApiKey: '82d81b87e11e9eaec888d5a696366981',
  ts: 'steve1',
  hash: '480b3566c538e095e127a38824e8bb8f',
};

// hash is built with md5. I simply used https://www.md5.cz/
// The key for the hash is md5(ts+privateKey+publicKey).
// ts = a timestamp or other string which can change on a request-by-request basis.
// Keys are created when you register a marvel account. https://developer.marvel.com/account
