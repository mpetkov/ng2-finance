/* tslint:disable:no-unused-variable */
import {
  WatchlistActions,
  StockDataInterface
} from './index';

export function main() {
  describe('WatchlistActions', () => {
    let actions: WatchlistActions;

    beforeEach(() => {
      actions = new WatchlistActions();
    });

    it('should create an action when changeStockData() is called', () => {
      let data:StockDataInterface = {
        symbol: 'symbol'
      };
      expect(actions.changeStockData(data))
        .toEqual({
          type: WatchlistActions.CHANGE_STOCK_DATA,
          payload: data
        });
    });

    it('should create an action when changeStock() is called', () => {
      let stock:string = 'stock';
      expect(actions.changeStock(stock))
        .toEqual({
          type: WatchlistActions.CHANGE_STOCK,
          payload: stock
        });
    });

    it('should create an action when addFavorite() is called', () => {
      let favorite:string = 'favorite';
      expect(actions.addFavorite(favorite))
        .toEqual({
          type: WatchlistActions.ADD_FAVORITE,
          payload: favorite
        });
    });

    it('should create an action when deleteFavorites() is called', () => {
      let favorites:string[] = ['string'];
      expect(actions.deleteFavorites(favorites))
        .toEqual({
          type: WatchlistActions.DELETE_FAVORITES,
          payload: favorites
        });
    });

    it('should create an action when changeHighlights() is called', () => {
      let highlights:any = {
        symbol: {}
      };
      expect(actions.changeHighlights(highlights))
        .toEqual({
          type: WatchlistActions.CHANGE_HIGHLIGHTS,
          payload: highlights
        });
    });
  });
}
