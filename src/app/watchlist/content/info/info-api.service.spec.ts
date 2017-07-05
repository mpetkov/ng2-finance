import {TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {InfoApiService} from './info-api.service';
import {InfoStateService} from './state/info-state.service';

describe('InfoApiService', () => {
  let service: InfoApiService;
  let getSubject: any;
  let getSpy: any;

  beforeEach(() => {
    const infoStateService: any = jasmine.createSpyObj('infoStateService', [
      'fetchLoader'
    ]);
    getSubject = new BehaviorSubject<any>([]);
    const injector = TestBed.configureTestingModule({
      providers: [
        InfoApiService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions): Http => {
            return new Http(backend, options);
          }
        },
        {provide: InfoStateService, useValue: infoStateService}
      ]
    });
    service = injector.get(InfoApiService);
    spyOn(service, 'toggleLoader');
    spyOn(service, 'complete');
    spyOn(service, 'failed');
    getSpy = spyOn(service, 'get');
    getSpy.and.callFake(() => getSubject);
  });

  it('should call toggleLoader() when load() is called', () => {
    service.load('');
    expect(service.toggleLoader).toHaveBeenCalledTimes(1);
    expect(service.toggleLoader).toHaveBeenCalledWith(true);
  });

  it('should call get() when load() is called', () => {
    service.load('a');
    expect(service.get).toHaveBeenCalledTimes(1);
    expect(service.get).toHaveBeenCalledWith('./assets/json/info/a.json');
  });

  it('should call complete() with a successful completion of get() call', () => {
    service.load('');
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call failed() when get() call errors out', () => {
    getSpy.and.callFake(() => Observable.throw('error'));
    service.load('');
    expect(service.failed).toHaveBeenCalledTimes(1);
  });

  it('should call complete() with transformed data with a completion of get() call', () => {
    getSubject.next({
      query: {
        results: {
          quote: {
            Volume: 165656545,
            AverageDailyVolume: 165656545
          }
        }
      }
    });
    service.load('');
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([{
      Volume: '165.66M',
      AverageDailyVolume: '165.66M'
    }]);
  });

  it('should call load() when reload() is called', () => {
    spyOn(service, 'load');
    service.reload();
    expect(service.load).toHaveBeenCalledTimes(1);
    expect(service.load).toHaveBeenCalledWith(undefined);
  });
});
