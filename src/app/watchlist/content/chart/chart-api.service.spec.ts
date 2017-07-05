import {TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {ChartApiService} from './chart-api.service';
import {ChartStateService} from './state/chart-state.service';

describe('ChartApiService', () => {
  let service: ChartApiService;
  let getSubject: any;
  let getSpy: any;
  let postSubject: any;
  let postSpy: any;

  beforeEach(() => {
    const chartStateService: any = jasmine.createSpyObj('chartStateService', [
      'fetchLoader'
    ]);

    getSubject = new BehaviorSubject<any>([]);
    postSubject = new BehaviorSubject<any>([]);

    const injector = TestBed.configureTestingModule({
      providers: [
        ChartApiService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions): Http => {
            return new Http(backend, options);
          }
        },
        {provide: ChartStateService, useValue: chartStateService}
      ]
    });
    service = injector.get(ChartApiService);
    spyOn(service, 'toggleLoader');
    spyOn(service, 'complete');
    spyOn(service, 'failed');
    getSpy = spyOn(service, 'get');
    getSpy.and.callFake(() => getSubject);
    postSpy = spyOn(service, 'post');
    postSpy.and.callFake(() => postSubject);
  });

  it('should call toggleLoader() when load() is called', () => {
    service.load('a', 'r', 'i');
    expect(service.toggleLoader).toHaveBeenCalledTimes(1);
    expect(service.toggleLoader).toHaveBeenCalledWith(true);
  });

  it('should call get() when load() is called in dev mode', () => {
    service.load('a', 'r', 'i');
    expect(service.get).toHaveBeenCalledTimes(1);
    expect(service.get).toHaveBeenCalledWith('./assets/json/chart/a/r.json');
  });

  it('should call post() when load() is called in prod mode', () => {
    service.load('a', 'r', 'i', {production: true, paths: {proxy: 'proxy', charts: 'url?stock=$stock'}});
    expect(service.post).toHaveBeenCalledTimes(1);
    expect(service.post).toHaveBeenCalledWith('proxy', 'url=url%3Fstock%3Da');
  });

  it('should call complete() with a successful completion of get() call', () => {
    service.load('a', 'r', 'i');
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call complete() with a successful completion of post() call', () => {
    service.load('a', 'r', 'i', {production: true, paths: {proxy: 'proxy', charts: 'url?stock=$stock'}});
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call failed() when get() call errors out', () => {
    getSpy.and.callFake(() => Observable.throw('error'));
    service.load('a', 'r', 'i');
    expect(service.failed).toHaveBeenCalledTimes(1);
  });

  it('should call failed() when post() call errors out', () => {
    postSpy.and.callFake(() => Observable.throw('error'));
    service.load('a', 'r', 'i', {production: true, paths: {proxy: 'proxy', charts: 'url?stock=$stock'}});
    expect(service.failed).toHaveBeenCalledTimes(1);
  });

  it('should call complete() with transformed data with a completion of get() call', () => {
    getSubject.next({chart: {result: [{timestamp: [1486737000], indicators: {quote: [{close: [10]}]}}]}});
    service.load('a', 'r', 'i');
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([{
      timestamp: 1486737000,
      date: new Date(1486737000 * 1000),
      close: 10,
      high: null,
      low: null,
      open: null,
      volume: null
    }]);
  });

  it('should call complete() with transformed data with a completion of post() call', () => {
    postSubject.next({chart: {result: [null]}});
    service.load('a', 'r', 'i', {production: true, paths: {proxy: 'proxy', charts: 'url?stock=$stock'}});
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);

    postSubject.next({chart: {result: [{timestamp: [1486737000], indicators: {quote: []}}]}});
    expect(service.complete).toHaveBeenCalledTimes(2);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call load() when reload() is called', () => {
    spyOn(service, 'load');
    service.reload();
    expect(service.load).toHaveBeenCalledTimes(1);
    expect(service.load).toHaveBeenCalledWith(undefined, undefined, undefined);
  });
});
