import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorInterface } from '../state/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoaderService {
  protected errorCount:number = 0;
  private options:RequestOptions;
  constructor(protected http:Http) {
    this.options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }

  get(url:string):Observable<string[]> {
    return this.http.get(url)
      .map((res:Response) => res.json())
      .catch(() => this.handleError());
  }

  post(url:string, params:any):Observable<string[]> {
    return this.http.post(url, params, this.options)
      .map((res:Response) => res.json())
      .catch(() => this.handleError());
  }

  private handleError() {
    this.errorCount++;
    let error:string = 'Yahoo\'s API was unable to load.';
    if (this.errorCount > 3) {
      error = 'Yahoo\'s API failed multiple times.  Please wait a minute before trying again.';
    }
    return Observable.throw(<ErrorInterface>{
      value: error,
      date: Date.now(),
      count: this.errorCount
    });
  }
}
