import {OnDestroy} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';

export class CoreSubscriptions implements OnDestroy {
  subscriptions: ISubscription[];

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((item: ISubscription) => {
      item.unsubscribe();
    });

    this.subscriptions.length = 0;
  }
}
