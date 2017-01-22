import { ConfigInterface } from './config.interface';

const yqlUrl:string = 'https://query.yahooapis.com/v1/public/yql';

const ProdConfig: ConfigInterface = {
  env: 'PROD',
  paths: {
    charts: 'https://query1.finance.yahoo.com/v7/finance/chart/YHOO?period2=1482851933&period1=1356707933&interval=1d&indicators=quote&includeTimestamps=true&includePrePost=true&events=div%7Csplit%7Cearn&corsDomain=finance.yahoo.com',
    news: yqlUrl +
    "?q=select%20*%20from%20rss%20where%20url%3D%27http%3A%2F%2Ffeeds.finance.yahoo.com%2Frss%2Fheadline%3Fs%3Dyhoo%27&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
    proxy: 'http://www.marinpetkov.com/proxy.php',
    search: 'https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;gossipConfig=%7B%22isJSONP%22%3Atrue%2C%22queryKey%22%3A%22query%22%2C%22resultAccessor%22%3A%22ResultSet.Result%22%2C%22suggestionTitleAccessor%22%3A%22symbol%22%2C%22suggestionMeta%22%3A%5B%22symbol%22%5D%2C%22url%22%3A%7B%22protocol%22%3A%22https%22%2C%22host%22%3A%22s.yimg.com%22%2C%22path%22%3A%22%2Fxb%2Fv6%2Ffinance%2Fautocomplete%22%2C%22query%22%3A%7B%22appid%22%3A%22yahoo.com%22%2C%22nresults%22%3A10%2C%22output%22%3A%22yjsonp%22%2C%22region%22%3A%22US%22%2C%22lang%22%3A%22en-US%22%7D%7D%2C%22region%22%3A%22US%22%2C%22lang%22%3A%22en-US%22%7D;searchTerm=ya?bkt=%5B%22findd-test03%22%2C%22findmexp002%22%5D&device=desktop&feature=canvass%2CnewContentAttribution%2CrelatedVideoFeature&intl=us&lang=en-US&partner=none&region=US&site=finance&tz=America%2FChicago&ver=0.101.749&returnMeta=true&callback=quote',
    stocks: yqlUrl +
    '?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20($stocks)' +
    '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  }
};

export = ProdConfig;
