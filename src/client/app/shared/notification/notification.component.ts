import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'mp-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css']
})

export class NotificationComponent {
  @Input() type:NotificationTypeEnum;
  @Input() value:string;
}

export enum NotificationTypeEnum {
  None,
  Notification,
  Error,
  Loader
}
