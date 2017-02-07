import { OnDestroy } from '@angular/core';

export class Subscriptions implements OnDestroy {
  subscriptions:any[];

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((item:any) => {
      item.unsubscribe();
      item = null;
    });

    this.subscriptions.length = 0;
  }
}
