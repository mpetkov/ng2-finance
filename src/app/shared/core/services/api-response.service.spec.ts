import {TestBed} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {CoreApiResponseService} from './api-response.service';
import {CoreApiStateService} from '../state/api-state.service';

describe('CoreApiResponseService', () => {
  let service: CoreApiResponseService;
  let coreApiStateService: any;

  beforeEach(() => {
    coreApiStateService = jasmine.createSpyObj('coreApiStateService', [
      'fetchLoader',
      'fetchFulfilled',
      'fetchError'
    ]);

    const injector = TestBed.configureTestingModule({
      providers: [
        CoreApiResponseService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions): Http => {
            return new Http(backend, options);
          }
        },
        {provide: CoreApiStateService, useValue: coreApiStateService}
      ]
    });

    service = injector.get(CoreApiResponseService);
  });

  it('should call CoreApiStateService#fetchLoader() when toggleLoader() is called', () => {
    service.toggleLoader(true);
    expect(coreApiStateService.fetchLoader).toHaveBeenCalledTimes(1);
    expect(coreApiStateService.fetchLoader).toHaveBeenCalledWith(true);

    service.disableLoader = true;
    service.toggleLoader(false);
    expect(coreApiStateService.fetchLoader).toHaveBeenCalledTimes(1);
  });

  it('should set disableLoader to false when complete() is called', () => {
    service.disableLoader = true;
    service.complete([]);
    expect(service.disableLoader).toBe(false);
  });

  it('should set errorCount to 0 when complete() is called with valid data', () => {
    service.errorCount = 5;
    service.complete([{}]);
    expect(service.errorCount).toBe(0);
  });

  it('should call CoreApiStateService#fetchLoader() when complete() is called with valid data', () => {
    service.complete([{}]);
    expect(coreApiStateService.fetchLoader).toHaveBeenCalledTimes(1);
    expect(coreApiStateService.fetchLoader).toHaveBeenCalledWith(false);
  });

  it('should call CoreApiStateService#fetchFulfilled() when complete() is called with valid data', () => {
    service.complete([{}]);
    expect(coreApiStateService.fetchFulfilled).toHaveBeenCalledTimes(1);
    expect(coreApiStateService.fetchFulfilled).toHaveBeenCalledWith([{}]);
  });

  it('should call failed() when complete() is called with invalid data', () => {
    spyOn(service, 'failed');
    service.complete([]);
    expect(service.failed).toHaveBeenCalledTimes(1);
    expect(service.failed).toHaveBeenCalledWith('Yahoo\'s API didn\'t return any data.');
  });

  it('should call CoreApiStateService#fetchError() when failed() is called', () => {
    service.failed();
    expect(coreApiStateService.fetchError).toHaveBeenCalledTimes(1);

    service.disableLoader = true;
    service.failed();
    expect(coreApiStateService.fetchError).toHaveBeenCalledTimes(1);
  });

  it('should increment errorCount when failed() is called', () => {
    expect(service.errorCount).toBe(0);
    service.failed();
    expect(service.errorCount).toBe(1);
  });


  it('should call CoreApiStateService#fetchError() with correct error message when failed() is called', () => {
    spyOn(Date, 'now').and.callFake(function () {
      return 'now';
    });

    service.failed();
    expect(coreApiStateService.fetchError).toHaveBeenCalledTimes(1);
    expect(coreApiStateService.fetchError).toHaveBeenCalledWith({
      value: 'Yahoo\'s API was unable to load.',
      date: 'now',
      count: 1
    });

    service.failed('a');
    expect(coreApiStateService.fetchError).toHaveBeenCalledTimes(2);
    expect(coreApiStateService.fetchError).toHaveBeenCalledWith({
      value: 'a',
      date: 'now',
      count: 2
    });

    service.failed('b');
    expect(coreApiStateService.fetchError).toHaveBeenCalledTimes(3);
    expect(coreApiStateService.fetchError).toHaveBeenCalledWith({
      value: 'b',
      date: 'now',
      count: 3
    });

    service.failed();
    expect(coreApiStateService.fetchError).toHaveBeenCalledTimes(4);
    expect(coreApiStateService.fetchError).toHaveBeenCalledWith({
      value: 'Yahoo\'s API failed multiple times.  Please wait a minute before trying again.',
      date: 'now',
      count: 4
    });
  });
});
