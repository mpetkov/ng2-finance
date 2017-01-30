import { ConfigInterface } from './config.interface';

const BaseConfig: ConfigInterface = {
  chartRanges: [
    {id: '1d', text: '1d', interval: '1m'},
    {id: '5d', text: '1w', interval: '5m'},
    {id: '1mo', text: '1m', interval: '1d'},
    {id: '3mo', text: '3m', interval: '1d'},
    {id: '6mo', text: '6m', interval: '1d'},
    {id: '1y', text: '1y', interval: '1d'},
    {id: '5y', text: '5y', interval: '1wk'},
    {id: 'max', text: 'max', interval: '1mo'}
  ]
};

export = BaseConfig;
