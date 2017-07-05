import {TestBed} from '@angular/core/testing';
import {InfoService} from './info.service';

describe('InfoService', () => {
  let service: InfoService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      providers: [
        InfoService
      ]
    });
    service = injector.get(InfoService);
  });

  it('should update the days/years low/high values based on the price when getDataWithUpdatedPrice() is called', () => {
    expect(service.getDataWithUpdatedPrice({
      DaysLow: 5,
      DaysHigh: 5,
      YearLow: 5,
      YearHigh: 5
    }, 10)).toEqual({
      DaysLow: 5,
      DaysHigh: 10,
      YearLow: 5,
      YearHigh: 10
    });
  });

  it('should return dayOptions when getDayOptions() is called', () => {
    expect(service.getDayOptions({
      DaysLow: 5,
      DaysHigh: 5,
      Open: 5
    }, 10)).toEqual({
      text: 'Day\'s Range',
      start: 5,
      end: 5,
      activeStart: 5,
      activeEnd: 10,
      active: 10
    });
  });

  it('should return yearOptions when getYearOptions() is called', () => {
    expect(service.getYearOptions({
      YearLow: 5,
      YearHigh: 5,
      Open: 5
    }, 10)).toEqual({
      text: '52 Week Range',
      start: 5,
      end: 5,
      activeStart: 5,
      activeEnd: 10,
      active: 10
    });
  });
});
