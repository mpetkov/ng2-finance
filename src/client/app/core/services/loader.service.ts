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
  private options:RequestOptions;
  constructor(protected http:Http) {
    this.options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    });
  }

  get(url:string, type:LoaderDataTypeEnum = LoaderDataTypeEnum.JSON):Observable<string[]> {
    return this.http.get(url)
      .map((res:Response) => this.getResponse(res, type))
      .catch((error) => this.handleError(error));
  }

  post(url:string, params:any):Observable<string[]> {
    return this.http.post(url, params, this.options)
      .map((res:Response) => res.json())
      .catch((error) => this.handleError(error));
  }

  private getResponse(response:Response, type:LoaderDataTypeEnum) {
    switch (type) {
      case LoaderDataTypeEnum.CSV:
        return this.transformCsv(response.text());
        break;
      default:
        return response.json();
    }
  }

  private handleError(error:any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  private transformCsv(csv:string):any[] {
    let lines:string[] = csv.split(/\r\n|\n/);
    let headers:string[] = lines[0].split(',');
    let content:string[];
    var data:any[] = [];

    for(let i:number = 1; i < lines.length; i++) {
      content = lines[i].split(',');
      if(content.length === headers.length) {
        data.push(content);
      }
    }

    return data;
  }
}


export enum LoaderDataTypeEnum {
  JSON,
  CSV
}
