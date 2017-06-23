import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'mp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
  @Output() action: EventEmitter<string> = new EventEmitter();

  buttonClick() {
    this.action.emit(this.button.action);
  }
}

export enum NotificationTypeEnum {
  None,
  Notification,
  Error,
  Loader
}

export interface NotificationButtonInterface {
  icon?: string;
  text?: string;
  action?: string;
}
