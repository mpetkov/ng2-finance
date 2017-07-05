import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CoreSubscriptions} from '../subscriptions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CoreApiService extends CoreSubscriptions {
  private options: RequestOptions;

  constructor(protected http: Http) {
    super();
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    });
  }

  get(url: string): Observable<string[]> {
    this.ngOnDestroy();
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error) => Observable.throw(error));
  }

  post(url: string, params: any): Observable<string[]> {
    this.ngOnDestroy();
    return this.http.post(url, params, this.options)
      .map((res: Response) => res.json())
      .catch((error) => Observable.throw(error));
  }
}
