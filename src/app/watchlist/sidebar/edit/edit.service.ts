import {ElementRef} from '@angular/core';

export class EditService {
  getOrder(list: ElementRef, deleted: string[]): string[] {
    const order: string[] = [];
    if (list) {
      let children: any = list.nativeElement.getElementsByTagName('li');
      for (let i = 0; i < children.length; i++) {
        if (deleted.indexOf(children[i].id) === -1) {
          order.push(children[i].id);
        }
      }
      children = null;
    }
    return order;
  }

  getDragOptions(): any {
    return {
      moves: function (el: Element, container: Element, handle: Element) {
        return handle.className.indexOf('mp-drag') !== -1;
      }
    };
  }
}
