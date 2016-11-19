import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoaderService {
  constructor(http: Http) {}
  get(url:string): Observable<string[]> {
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg:string = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
