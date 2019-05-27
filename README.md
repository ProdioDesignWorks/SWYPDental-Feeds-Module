# SWYPDental APIs

A NodeJS interface for SWYPDental APIs.


## Add to your project
```shell
$ npm install swypdental-feeds-module --save
```

## Test
```shell
$ API_KEY=<your api key> npm test
```

## Example usage of v2 API
All methods support promises and node-style callbacks.
```js
const SWYPDentalAPIs = require('swypdental-feeds-module');
const swypapis = new SWYPDentalAPIs('YOUR_API_KEY');

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
swypapis.v2.topHeadlines({
  q: 'trump',
  category: 'politics',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});

// To query everything
// You must include at least one q, source, or domain
swypapis.v2.everything({
  q: 'trump',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk,techcrunch.com',
  from: '2017-12-01',
  to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});

// To query sources
// All options are optional
swypapis.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});
```