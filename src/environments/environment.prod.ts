export const environment = {
  production: true,
  marvelApiUrl: 'http://gateway.marvel.com/v1/public/',
  marvelApiKey: '',
  ts: '',
  hash: '',
};
// hash is built with md5. I simply used https://www.md5.cz/
// The key for the hash is md5(ts+privateKey+publicKey).
// ts = a timestamp or other string which can change on a request-by-request basis.
// Keys are created when you register a marvel account. https://developer.marvel.com/account
