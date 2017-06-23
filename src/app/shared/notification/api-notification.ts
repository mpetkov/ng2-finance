import {CoreSubscriptions} from '../core/subscriptions';
import {CoreApiStateService} from '../core/state/api-state.service';
import {NotificationButtonInterface, NotificationTypeEnum} from './notification.component';

export class ApiNotification extends CoreSubscriptions {
  notification: string;
  notificationType: NotificationTypeEnum;
  button: NotificationButtonInterface;

  constructor(private state: CoreApiStateService,
              private apiService: any) {
    super();
    this.subscriptions.push(state.loader$.subscribe(
      loader => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    ));

    this.subscriptions.push(state.error$.subscribe(
      error => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    ));
  }

  notificationAction(type: string) {
    if (type === NotificationActions.Reload) {
      this.apiService.reload();
    }
  }

  updateNotification(type: NotificationTypeEnum, value: any = null, button: NotificationButtonInterface = null) {
    this.notificationType = type;
    if (type === NotificationTypeEnum.Error) {
      this.notification = value.value;
      this.button = {
        icon: 'refresh',
        text: 'Try Again',
        action: NotificationActions.Reload
      };
    } else {
      this.button = button;
      this.notification = value;
    }
  }
}

export class NotificationActions {
  static Reload = 'reload';
}
