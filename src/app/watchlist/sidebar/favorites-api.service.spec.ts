import {TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {FavoritesApiService} from './favorites-api.service';
import {FavoritesStateService} from './favorites/state/favorites-state.service';

describe('FavoritesApiService', () => {
  let service: FavoritesApiService;
  let getSubject: any;
  let getSpy: any;

  beforeEach(() => {
    const favoritesStateService: any = jasmine.createSpyObj('favoritesStateService', [
      'fetchLoader'
    ]);
    getSubject = new BehaviorSubject<any>([]);
    const injector = TestBed.configureTestingModule({
      providers: [
        FavoritesApiService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions): Http => {
            return new Http(backend, options);
          }
        },
        {provide: FavoritesStateService, useValue: favoritesStateService}
      ]
    });
    service = injector.get(FavoritesApiService);
    spyOn(service, 'toggleLoader');
    spyOn(service, 'complete');
    spyOn(service, 'failed');
    getSpy = spyOn(service, 'get');
    getSpy.and.callFake(() => getSubject);
  });

  it('should call toggleLoader() when load() is called', () => {
    service.load([]);
    expect(service.toggleLoader).toHaveBeenCalledTimes(1);
    expect(service.toggleLoader).toHaveBeenCalledWith(true);
  });

  it('should call get() when load() is called', () => {
    service.load(['a']);
    expect(service.get).toHaveBeenCalledTimes(1);
    expect(service.get).toHaveBeenCalledWith('./assets/json/stocks.json');
  });

  it('should call complete() with a successful completion of get() call', () => {
    service.load([]);
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call failed() when get() call errors out', () => {
    getSpy.and.callFake(() => Observable.throw('error'));
    service.load([]);
    expect(service.failed).toHaveBeenCalledTimes(1);
  });

  it('should call complete() with transformed data with a completion of get() call', () => {
    getSubject.next({
      query: {
        results: {
          quote: [{
            symbol: 'a',
            Name: 'a',
            Change: '0.3056',
            LastTradePriceOnly: '132.126464'
          }]
        }
      }
    });
    service.load([]);
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([{
      symbol: 'a',
      name: 'a',
      price: 132.126464,
      priceDisplay: '132.13',
      change: '+0.31',
      percentage: '+0.23%'
    }]);

    getSubject.next({
      query: {
        results: {
          quote: {
            symbol: 'a',
            Name: 'a',
            Change: '-0.3056',
            LastTradePriceOnly: '132.126464'
          }
        }
      }
    });
    expect(service.complete).toHaveBeenCalledTimes(2);
    expect(service.complete).toHaveBeenCalledWith([{
      symbol: 'a',
      name: 'a',
      price: 132.126464,
      priceDisplay: '132.13',
      change: '-0.31',
      percentage: '-0.23%'
    }]);

    getSubject.next({
      query: {
        results: {
          quote: {
            symbol: 'a',
            Name: 'a',
            LastTradePriceOnly: '132.126464'
          }
        }
      }
    });
    expect(service.complete).toHaveBeenCalledTimes(3);
    expect(service.complete).toHaveBeenCalledWith([{
      symbol: 'a',
      name: 'a',
      price: 132.126464,
      priceDisplay: '132.13',
      change: '0.00',
      percentage: '0.00%'
    }]);
  });

  it('should call load() when reload() is called', () => {
    spyOn(service, 'load');
    service.reload();
    expect(service.load).toHaveBeenCalledTimes(1);
    expect(service.load).toHaveBeenCalledWith([]);
  });
});
