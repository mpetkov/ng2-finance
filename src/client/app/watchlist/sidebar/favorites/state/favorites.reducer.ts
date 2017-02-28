import {
  ActionReducer,
  Action
} from '@ngrx/store';
import { FavoritesInitialState } from './favorites.state';
import {
  FavoritesActions,
  FavoritesStateKeys,
  FavoritesStateInterface
} from './index';
import { StockDataInterface } from '../../../state/watchlist.state';
declare let _:any;

const initialState:FavoritesStateInterface = new FavoritesInitialState() as FavoritesStateInterface;

export const favoritesReducer:ActionReducer<FavoritesStateInterface> =
  (state:FavoritesStateInterface = initialState, {payload, type}: Action) => {
    switch (type) {
      case FavoritesActions.CHANGE_ORDER:
        return state.set(FavoritesStateKeys.Order, payload);
      case FavoritesActions.SORT_DATA:
        return state.set(FavoritesStateKeys.Data, sortData(state.data, state.order));
      case FavoritesActions.FETCH_FULFILLED:
        return state.set(FavoritesStateKeys.Data, sortData(payload, state.order));
      case FavoritesActions.FETCH_LOADER:
        return state.set(FavoritesStateKeys.Loader, payload);
      case FavoritesActions.FETCH_ERROR:
        return state.set(FavoritesStateKeys.Error, payload);
      default:
        return state;
    }
  };


function sortData(data:StockDataInterface[], order:string[]):StockDataInterface[] {
  data = data.map((item:StockDataInterface) => {
    let index:number = order.indexOf(item.symbol);
    if (index < 0) {
      index = 999;
    }
    item.index = index;
    return item;
  });
  return _.sortBy(data, ['index']);
}
