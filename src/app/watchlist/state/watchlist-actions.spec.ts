import {WatchlistActions} from './watchlist-actions';
import {StockDataInterface} from './watchlist-state';

describe('WatchlistActions', () => {
  let actions: WatchlistActions;

  beforeEach(() => {
    actions = new WatchlistActions();
  });

  it('should create an action when changeStockData() is called', () => {
    const data: StockDataInterface = {
      symbol: 'symbol'
    };
    expect(actions.changeStockData(data))
      .toEqual({
        type: WatchlistActions.CHANGE_STOCK_DATA,
        payload: data
      });
  });

  it('should create an action when changeStock() is called', () => {
    const stock = 'stock';
    expect(actions.changeStock(stock))
      .toEqual({
        type: WatchlistActions.CHANGE_STOCK,
        payload: stock
      });
  });

  it('should create an action when addFavorite() is called', () => {
    const favorite = 'favorite';
    expect(actions.addFavorite(favorite))
      .toEqual({
        type: WatchlistActions.ADD_FAVORITE,
        payload: favorite
      });
  });

  it('should create an action when deleteFavorites() is called', () => {
    const favorites: string[] = ['string'];
    expect(actions.deleteFavorites(favorites))
      .toEqual({
        type: WatchlistActions.DELETE_FAVORITES,
        payload: favorites
      });
  });

  it('should create an action when changeHighlights() is called', () => {
    const highlights: any = {
      symbol: {}
    };
    expect(actions.changeHighlights(highlights))
      .toEqual({
        type: WatchlistActions.CHANGE_HIGHLIGHTS,
        payload: highlights
      });
  });
});
