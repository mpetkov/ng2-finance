import { environment as base } from './environment.base';
import { extend } from 'lodash';

const yqlUrl: string = 'https://query.yahooapis.com/v1/public/yql';
export const environment = extend(base, {
  production: true,
  analytics: 'ANALYTICS_ID',
  paths: {
    charts: 'https://query1.finance.yahoo.com/v7/finance/chart/$stock?range=$range&interval=$interval&indicators=quote&' +
    'includeTimestamps=true&includePrePost=false&corsDomain=finance.yahoo.com',
    news: 'https://query1.finance.yahoo.com/v2/finance/news?lang=en-US&region=US&symbols=$stock&corsDomain=finance.yahoo.com',
    proxy: 'http://www.marinpetkov.com/proxy.php',
    search: 'https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;gossipConfig=%7B%22isJSONP%22%3A' +
    'true%2C%22queryKey%22%3A%22query%22%2C%22resultAccessor%22%3A%22ResultSet.Result%22%2C%22suggestionTitleAccessor%22%3A%22' +
    'symbol%22%2C%22suggestionMeta%22%3A%5B%22symbol%22%5D%2C%22url%22%3A%7B%22protocol%22%3A%22https%22%2C%22host%22%3A%22' +
    's.yimg.com%22%2C%22path%22%3A%22%2Fxb%2Fv6%2Ffinance%2Fautocomplete%22%2C%22query%22%3A%7B%22appid%22%3A%22yahoo.com' +
    '%22%2C%22nresults%22%3A10%2C%22output%22%3A%22yjsonp%22%2C%22region%22%3A%22US%22%2C%22lang%22%3A%22en-US' +
    '%22%7D%7D%2C%22region%22%3A%22US%22%2C%22lang%22%3A%22en-US%22%7D;searchTerm=$stock?bkt=%5B%22findd-test03' +
    '%22%2C%22findmexp002%22%5D&device=desktop&feature=canvass%2CnewContentAttribution%2CrelatedVideoFeature' +
    '&intl=us&lang=en-US&partner=none&region=US&site=finance&tz=America%2FChicago&ver=0.101.749&returnMeta=true&callback=quote',
    stocks: yqlUrl +
    '?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20($stocks)' +
    '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
    info: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in' +
    '%20(%22$stock%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
  }
});
