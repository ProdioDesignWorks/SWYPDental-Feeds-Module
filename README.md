# SWYPDental APIs

A NodeJS interface for SWYPDental APIs.


## Add to your project
```shell
$ npm install swypdental-feeds-module --save
```

## Example usage of v2 API
All methods support promises and node-style callbacks.
```js
const SWYPDentalAPIs = require('swypdental-feeds-module');
const swypapis = new SWYPDentalAPIs();

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
swypapis.getAPIKey({
  email: 'abc@gmail.com',
  domain: 'example.com'
}).then(response => {
  console.log(response);
  /*
    {
      status: "success",
      data: [...]
    }
  */
});

// To query everything
// You must include at least one q, source, or domain
swypapis.getArchivedFeeds({
  apiKey: 'API_KEY',
}).then(response => {
  console.log(response);
  /*
    {
      status: "success",
      data: [...]
    }
  */
});

// To query sources
// All options are optional
swypapis.getDailyDigestFeeds({
  apiKey: 'API_KEY',
}).then(response => {
  console.log(response);
  /*
    {
      status: "success",
      data: [...]
    }
  */
});
```