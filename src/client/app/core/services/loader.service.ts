import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoaderService {
  private options:RequestOptions;

  constructor(protected http:Http) {
    this.options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    });
  }

  get(url:string):Observable<string[]> {
    return this.http.get(url)
      .map((res:Response) => res.json())
      .catch((error) => Observable.throw(error));
  }

  post(url:string, params:any):Observable<string[]> {
    return this.http.post(url, params, this.options)
      .map((res:Response) => res.json())
      .catch((error) => Observable.throw(error));
  }
}
