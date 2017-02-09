import { ConfigInterface } from './config.interface';

const BaseConfig: ConfigInterface = {
  notifications: {
    noData: 'No results found',
    noStock: 'Please select a stock symbol',
    search: 'Type a company name or stock symbol',
    noFavorites: 'Your favorites is empty'
  },
  chartRanges: [
    {id: '5d', text: '1w', interval: {value:8, type:'days'}},
    {id: '1mo', text: '1m', interval: {value:1, type:'months'}},
    {id: '3mo', text: '3m', interval: {value:3, type:'months'}},
    {id: '6mo', text: '6m', interval: {value:6, type:'months'}},
    {id: '1y', text: '1y', interval: {value:1, type:'years'}},
    {id: '5y', text: '5y', interval: {value:5, type:'years'}},
    {id: 'max', text: 'max', interval: {value:100, type:'years'}}
  ]
};

export = BaseConfig;
