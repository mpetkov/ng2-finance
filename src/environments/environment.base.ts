export const environment = {
  notifications: {
    noData: 'No results found',
    noStock: 'Please select a stock symbol',
    search: 'Type a company name or stock symbol',
    noFavorites: 'Your favorites is empty'
  },
  chartRanges: [
    {id: '1d', text: '1d', interval: '1m'},
    {id: '5d', text: '1w', interval: '5m'},
    {id: '3mo', text: '3m', interval: '1d'},
    {id: '6mo', text: '6m', interval: '1d'},
    {id: '1y', text: '1y', interval: '1d'},
    {id: '5y', text: '5y', interval: '1wk'},
    {id: 'max', text: 'max', interval: '1mo'}
  ]
};
