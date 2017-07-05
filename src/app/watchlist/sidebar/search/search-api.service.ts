import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {CoreApiResponseService} from '../../../shared/core/services/api-response.service';
import {SearchStateService} from './state/search-state.service';
import {get} from 'lodash';

@Injectable()
export class SearchApiService extends CoreApiResponseService {
  private stock: string;

  constructor(public http: Http,
              private searchState: SearchStateService) {
    super(http, searchState);
  }

  load(stock: string, env: any = environment) {
    this.stock = stock;
    this.toggleLoader(true);
    if (env.production) {
      this.post(env.paths.proxy, 'url=' + encodeURIComponent(env.paths.search.replace('$stock', encodeURIComponent(stock))))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.get(env.paths.search)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.stock);
  }

  private transform(data: any): any[] {
    return get(data, 'data.items', []);
  }
}
