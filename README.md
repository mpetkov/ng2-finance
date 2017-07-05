# NG2 Finance

[![Build Status](https://travis-ci.org/mpetkov/ng2-finance.svg?branch=master)](https://travis-ci.org/mpetkov/ng2-finance)
[![Coverage Status](https://coveralls.io/repos/github/mpetkov/ng2-finance/badge.svg?branch=master)](https://coveralls.io/github/mpetkov/ng2-finance?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Dependencies Status](https://david-dm.org/mpetkov/ng2-finance/status.svg)](https://david-dm.org/mpetkov/ng2-finance)
[![DevDependencies Status](https://david-dm.org/mpetkov/ng2-finance/dev-status.svg)](https://david-dm.org/mpetkov/ng2-finance?type=dev)

Finance dashboard using Yahoo's public APIs. 
* [Live Demo*](http://projects.marinpetkov.com/ng2-finance/#/watchlist/FB) - Loads Yahoo's public API.
* [Static Demo*](http://projects.marinpetkov.com/ng2-finance/static/#/watchlist/FB) - Loads local JSON files.

<i>*This is for demo purposes only, please don't rely on the prices provided.</i>

![Screenshot](http://projects.marinpetkov.com/ng2-finance/preview.jpg)

# Features

* Search for any stock symbol to view historical data, summary, and news.
* Add and remove stock symbols to favorites.
* Stock data refreshes every 15 seconds in the background.
* Settings are saved to local storage.
* Fully responsive.
* Continuous integration and code coverage with Travis CI and Coveralls.

# Todo List

- [ ] 100% code coverage
- [ ] Convert to React
- [ ] Add advanced chart options
- [ ] Add a way to view more info about a stock
- [ ] Create a markets overview page that displays movers, gainers, loser, etc

# Quick Start

```bash
$ git clone https://github.com/mpetkov/ng2-finance.git
$ cd ng2-finance
$ npm install
$ npm install -g @angular/cli
$ ng serve
$ Navigate to http://localhost:4200/
```

# Configuration

Default application server configuration

```js
var PORT             = 4200;
var APP_BASE         = '/';
```

Configure at runtime

```bash
$ ng serve --host 0.0.0.0 --port 4201
```

# Running tests

```bash
# Development. Your app will be watched by karma
# on each change all your specs will be executed.
$ ng test

# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
$ ng test -sr -cc
```

# License

The MIT License
