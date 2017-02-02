import {
  NotificationTypeEnum,
  NotificationButtonInterface
} from '../shared/index';

export class CoreApiNotification {
  notification:string;
  notificationType:NotificationTypeEnum;
  button:NotificationButtonInterface;

  constructor(private state:any,
              private apiService:any) {
    state.loader$.subscribe(
      (loader:boolean) => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    );

    state.error$.subscribe(
      (error:string) => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    );
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
