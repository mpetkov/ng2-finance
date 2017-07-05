import {TestBed} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {NewsApiService} from './news-api.service';
import {NewsStateService} from './state/news-state.service';
import * as moment from 'moment';

describe('NewsApiService', () => {
  let service: NewsApiService;
  let getSubject: any;
  let getSpy: any;
  let postSubject: any;
  let postSpy: any;

  beforeEach(() => {
    const newsStateService: any = jasmine.createSpyObj('newsStateService', [
      'fetchLoader'
    ]);

    getSubject = new BehaviorSubject<any>([]);
    postSubject = new BehaviorSubject<any>([]);

    const injector = TestBed.configureTestingModule({
      providers: [
        NewsApiService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions): Http => {
            return new Http(backend, options);
          }
        },
        {provide: NewsStateService, useValue: newsStateService}
      ]
    });
    service = injector.get(NewsApiService);
    spyOn(service, 'toggleLoader');
    spyOn(service, 'complete');
    spyOn(service, 'failed');
    getSpy = spyOn(service, 'get');
    getSpy.and.callFake(() => getSubject);
    postSpy = spyOn(service, 'post');
    postSpy.and.callFake(() => postSubject);
  });

  it('should call toggleLoader() when load() is called', () => {
    service.load('a');
    expect(service.toggleLoader).toHaveBeenCalledTimes(1);
    expect(service.toggleLoader).toHaveBeenCalledWith(true);
  });

  it('should call get() when load() is called in dev mode', () => {
    service.load('a');
    expect(service.get).toHaveBeenCalledTimes(1);
    expect(service.get).toHaveBeenCalledWith('./assets/json/news/a.json');
  });

  it('should call post() when load() is called in prod mode', () => {
    service.load('a', {production: true, paths: {proxy: 'proxy', news: 'url?stock=$stock'}});
    expect(service.post).toHaveBeenCalledTimes(1);
    expect(service.post).toHaveBeenCalledWith('proxy', 'url=url%3Fstock%3Da');
  });

  it('should call complete() with a successful completion of get() call', () => {
    service.load('a');
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call complete() with a successful completion of post() call', () => {
    service.load('a', {production: true, paths: {proxy: 'proxy', news: 'url?stock=$stock'}});
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith([]);
  });

  it('should call failed() when get() call errors out', () => {
    getSpy.and.callFake(() => Observable.throw('error'));
    service.load('a');
    expect(service.failed).toHaveBeenCalledTimes(1);
  });

  it('should call failed() when post() call errors out', () => {
    postSpy.and.callFake(() => Observable.throw('error'));
    service.load('a', {production: true, paths: {proxy: 'proxy', news: 'url?stock=$stock'}});
    expect(service.failed).toHaveBeenCalledTimes(1);
  });

  it('should call complete() with transformed data with a completion of get() call', () => {
    getSubject.next({
      Content: {
        result: [{
          provider_name: 'a',
          provider_publish_time: 1486859417,
          title: 'a',
          url: 'a',
          thumbnail: 'a'
        }]
      }
    });
    service.load('a');
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith(
      [{
        source: 'a',
        date: moment(1486859417 * 1000).format('ddd, MMM Do YYYY h:mm A'),
        title: 'a',
        url: 'a',
        image: 'a'
      }]);
  });

  it('should call complete() with transformed data with a completion of post() call', () => {
    postSubject.next({
      Content: {
        result: [{
          provider_name: 'a',
          provider_publish_time: 1486859417,
          title: 'a',
          url: 'a',
          thumbnail: 'a'
        }]
      }
    });
    service.load('a', {production: true, paths: {proxy: 'proxy', news: 'url?stock=$stock'}});
    expect(service.complete).toHaveBeenCalledTimes(1);
    expect(service.complete).toHaveBeenCalledWith(
      [{
        source: 'a',
        date: moment(1486859417 * 1000).format('ddd, MMM Do YYYY h:mm A'),
        title: 'a',
        url: 'a',
        image: 'a'
      }]);
  });


  it('should call load() when reload() is called', () => {
    spyOn(service, 'load');
    service.reload();
    expect(service.load).toHaveBeenCalledTimes(1);
    expect(service.load).toHaveBeenCalledWith(undefined);
  });
});
