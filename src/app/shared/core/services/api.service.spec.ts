import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoreApiService } from './api.service';

describe('CoreApiService', () => {
  const url = 'www.test.com';
  let httpMock: HttpTestingController;
  let service: CoreApiService;
  let response: any;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoreApiService
      ]
    });

    service = injector.get(CoreApiService);
    httpMock = injector.get(HttpTestingController);

    response = JSON.stringify({test: []});
  });

  afterEach(() => httpMock.verify());

  describe('get()', () => {
    it('should perform GET request to provided url', () => {
      httpMock.expectOne({
        url: url,
        method: 'GET'
      });
      service.get(url);
    });

    it('should return response data', () => {
      httpMock.expectOne(url).flush(response);
      service.get(url)
        .subscribe(
          (res: any) => {
            expect(res).toBeDefined();
            expect(Array.isArray(res.test)).toBe(true);
          }
        );
    });

    it('should return error', () => {
      httpMock.expectOne(url).flush(null);
      service.get(url)
        .subscribe(
          (res: any) => expect(res).toBeUndefined(),
          (error: any) => {
            expect(error.message).toBe('Cannot read property \'json\' of null');
          }
        );
    });
  });


  describe('post()', () => {
    it('should perform POST request to provided url', () => {
      httpMock.expectOne({
        url: url,
        method: 'POST'
      });
      service.post(url, {});
    });

    it('should return response data', () => {
      httpMock.expectOne(url).flush(response);
      service.post(url, {})
        .subscribe(
          (res: any) => {
            expect(res).toBeDefined();
            expect(Array.isArray(res.test)).toBe(true);
          }
        );
    });

    it('should return error', () => {
      httpMock.expectOne(url).flush(null);
      service.post(url, {})
        .subscribe(
          (res: any) => expect(res).toBeUndefined(),
          (error: any) => {
            expect(error.message).toBe('Cannot read property \'json\' of null');
          }
        );
    });
  });
});
