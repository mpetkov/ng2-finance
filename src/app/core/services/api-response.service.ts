import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoaderService } from './loader.service';
import {
  CoreApiStateService,
  ErrorInterface
} from '../state/index';

@Injectable()
export class CoreApiResponseService extends LoaderService {
  disableLoader:boolean;
  errorCount:number = 0;

  constructor(protected http:Http,
              protected state:CoreApiStateService) {
    super(http);
  }

  toggleLoader(loader:boolean) {
    if (!this.disableLoader) {
      this.state.fetchLoader(loader);
    }
  }

  complete(data:any[]) {
    this.disableLoader = false;
    if (data.length > 0) {
      this.errorCount = 0;
      this.toggleLoader(false);
      this.state.fetchFulfilled(data);
    } else {
      this.failed('Yahoo\'s API didn\'t return any data.');
    }
  }

  failed(error:string = null) {
    if (!this.disableLoader) {
      this.errorCount++;

      if (!error) {
        error = 'Yahoo\'s API was unable to load.';
        if (this.errorCount > 3) {
          error = 'Yahoo\'s API failed multiple times.  Please wait a minute before trying again.';
        }
      }

      this.state.fetchError(<ErrorInterface>{
        value: error,
        date: String(Date.now()),
        count: this.errorCount
      });
    }
  }
}
