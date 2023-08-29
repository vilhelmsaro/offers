
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
 
## Description

A scalable app to convert multiple object types into one specific entry.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
In order to test the app, simply call the API 'localhost:3000/offers', and look at the logs the application produces. It will by default run on the valid samples of a few offers, if you want to test it by giving invalid payloads, have a look at the comments in the [offers.controller.ts](https://github.com/vilhelmsaro/offers/blob/main/src/offers/offers.controller.ts) file.

## License

Nest is [MIT licensed](LICENSE).
