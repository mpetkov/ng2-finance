import {RangeOptionsInterface} from './range/range.component';
import {InfoDataInterface} from './state/info-state';

export class InfoService {
  getDataWithUpdatedPrice(data: InfoDataInterface, price: number): InfoDataInterface {
    const newData: InfoDataInterface = Object.assign({}, data);
    newData.DaysLow = Math.min(data.DaysLow, price);
    newData.DaysHigh = Math.max(data.DaysHigh, price);
    newData.YearLow = Math.min(data.YearLow, price);
    newData.YearHigh = Math.max(data.YearHigh, price);

    return newData;
  }

  getDayOptions(data: InfoDataInterface, price: number): RangeOptionsInterface {
    return {
      text: 'Day\'s Range',
      start: data.DaysLow,
      end: data.DaysHigh,
      activeStart: Math.min(data.Open, price),
      activeEnd: Math.max(data.Open, price),
      active: price
    };
  }

  getYearOptions(data: InfoDataInterface, price: number): RangeOptionsInterface {
    return {
      text: '52 Week Range',
      start: data.YearLow,
      end: data.YearHigh,
      activeStart: Math.min(data.Open, price),
      activeEnd: Math.max(data.Open, price),
      active: price
    };
  }
}
