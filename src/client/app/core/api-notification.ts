import {
  NotificationTypeEnum,
  NotificationButtonInterface
} from '../shared/index';
import { Subscriptions } from './subscriptions';

export class CoreApiNotification extends Subscriptions {
  notification:string;
  notificationType:NotificationTypeEnum;
  button:NotificationButtonInterface;

  constructor(private state:any,
              private apiService:any) {
    super();
    this.subscriptions.push(state.loader$.subscribe(
      (loader:boolean) => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    ));

    this.subscriptions.push(state.error$.subscribe(
      (error:string) => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    ));
  }

  protected notificationAction(type:string) {
    if (type === NotificationActions.Reload) {
      this.apiService.reload();
    }
  }

  protected updateNotification(type:NotificationTypeEnum, value:string = null, button:NotificationButtonInterface = null) {
    this.notificationType = type;
    this.notification = value;
    if (type === NotificationTypeEnum.Error) {
      this.button = {
        icon: 'refresh',
        text: 'Try Again',
        action: NotificationActions.Reload
      };
    } else {
      this.button = button;
    }
  }
}

export class NotificationActions {
  static Reload = 'reload';
}
