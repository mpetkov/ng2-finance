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
declare let _:any;

const initialState:FavoritesStateInterface = new FavoritesInitialState() as FavoritesStateInterface;

export const favoritesReducer:ActionReducer<FavoritesStateInterface> =
  (state:FavoritesStateInterface = initialState, action:Action = null) => {
  switch (action.type) {
    case FavoritesActions.CHANGE_ORDER:
      return state.set(FavoritesStateKeys.Order,  action.payload);
    case FavoritesActions.SORT_DATA:
      return state.set(FavoritesStateKeys.Data, sortData(state.data, state.order));
    case FavoritesActions.FETCH_FULFILLED:
      return state.set(FavoritesStateKeys.Data, sortData(action.payload, state.get(FavoritesStateKeys.Order)));
    case FavoritesActions.FETCH_LOADER:
      return state.set(FavoritesStateKeys.Loader, action.payload);
    case FavoritesActions.FETCH_ERROR:
      return state.set(FavoritesStateKeys.Error, action.payload);
    default:
      return state;
  }
};


function sortData(data:any[], order:string[]):any[] {
  data = data.map((item:any) => {
    let index:number = order.indexOf(item.symbol);
    if(index < 0) {
      index = 999;
    }
    item.index = index;
    return item;
  });
  return _.sortBy(data, ['index']);
}
