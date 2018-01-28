import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoreApiService } from './api.service';

describe('CoreApiService', () => {
  const url = 'www.test.com';
  const errorMessage = 'Http failure response for ' + url + ': 404 Bad Request';
  const mockErrorResponse = {status: 404, statusText: 'Bad Request'};
  const response = {test: []};
  let httpMock: HttpTestingController;
  let service: CoreApiService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoreApiService
      ]
    });

    service = injector.get(CoreApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('get()', () => {
    it('should perform GET request to provided url', () => {
      service.get(url).subscribe((res: any) => expect(res).toBeDefined());
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });

    it('should return response data', () => {
      service.get(url)
        .subscribe(
          (res: any) => {
            expect(res).toBeDefined();
            expect(Array.isArray(res.test)).toBe(true);
          }
        );
      httpMock.expectOne(url).flush(response);
    });

    it('should return error', () => {
      service.get(url)
        .subscribe(
          res => expect(res).toBeNull(),
          error => expect(error.message).toBe(errorMessage)
        );
      httpMock.expectOne(url).flush(null, mockErrorResponse);
    });
  });


  describe('post()', () => {
    it('should perform POST request to provided url', () => {
      service.post(url, {}).subscribe((res: any) => expect(res).toBeDefined());
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });

    it('should return response data', () => {
      service.post(url, {})
        .subscribe(
          (res: any) => {
            expect(res).toBeDefined();
            expect(Array.isArray(res.test)).toBe(true);
          }
        );
      httpMock.expectOne(url).flush(response);
    });

    it('should return error', () => {
      service.post(url, {})
        .subscribe(
          res => expect(res).toBeNull(),
          error => expect(error.message).toBe(errorMessage)
        );
      httpMock.expectOne(url).flush(null, mockErrorResponse);
    });
  });
});
