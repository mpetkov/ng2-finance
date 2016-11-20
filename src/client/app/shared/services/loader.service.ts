import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoaderService {
  data$:Observable<any[]>;
  private dataObserver:Observer<any[]>;

  constructor(protected http: Http) {
    this.data$ = new Observable<any[]>(
      (observer:Observer<any[]>) => this.dataObserver = observer
    );
  }

  get(url:string): Observable<string[]> {
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  changeData(data:Array<any>) {
    if(this.dataObserver) {
      this.dataObserver.next(data);
    }
  }

  private handleError (error: any) {
    let errMsg:string = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
