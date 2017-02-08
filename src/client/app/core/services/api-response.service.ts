import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoaderService } from './loader.service';

@Injectable()
export class CoreApiResponseService extends LoaderService {
  protected errorCount:number = 0;
  constructor(protected http:Http,
              protected state:any) {
    super(http);
  }

  protected complete(data:any[]) {
    if (data.length > 0) {
      this.errorCount = 0;
      this.state.fetchFulfilled(data);
      this.state.fetchLoader(false);
    } else {
      this.failed('Yahoo\'s API didn\'t return any data.');
    }
  }

  protected failed(error:string = null) {
    this.errorCount++;

    if (!error) {
      error = 'Yahoo\'s API was unable to load.';
      if (this.errorCount > 3) {
        error = 'Yahoo\'s API failed multiple times.  Please wait a minute before trying again.';
      }
    }

    this.state.fetchError({
      value: error,
      date: Date.now(),
      count: this.errorCount
    });
  }
}
