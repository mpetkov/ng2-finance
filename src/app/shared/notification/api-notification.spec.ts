import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiNotification, NotificationActions} from './api-notification';
import {NotificationTypeEnum} from './notification.component';

describe('ApiNotification', () => {
  let apiNotification: ApiNotification;
  let coreApiStateService: any;
  let apiService: any;

  beforeEach(() => {
    coreApiStateService = jasmine.createSpyObj('coreApiStateService', [
      'fetchLoader'
    ]);

    apiService = jasmine.createSpyObj('apiService', [
      'reload'
    ]);

    coreApiStateService.loader$ = new BehaviorSubject<any>(false);
    coreApiStateService.error$ = new BehaviorSubject<any>(null);
    apiNotification = new ApiNotification(coreApiStateService, apiService);
  });

  it('should call apiService#reload() when notificationAction() is called', () => {
    apiNotification.notificationAction('a');
    expect(apiService.reload).toHaveBeenCalledTimes(0);

    apiNotification.notificationAction('reload');
    expect(apiService.reload).toHaveBeenCalledTimes(1);
  });


  it('should set notificationType when updateNotification() is called', () => {
    apiNotification.updateNotification(NotificationTypeEnum.Loader);
    expect(apiNotification.notificationType).toBe(NotificationTypeEnum.Loader);
  });

  it('should set notification when updateNotification() is called', () => {
    apiNotification.updateNotification(NotificationTypeEnum.Notification, 'a');
    expect(apiNotification.notification).toBe('a');

    apiNotification.updateNotification(NotificationTypeEnum.Error, {value: 'b'});
    expect(apiNotification.notification).toBe('b');
  });

  it('should set button when updateNotification() is called', () => {
    apiNotification.updateNotification(NotificationTypeEnum.Notification, 'a', {text: 'b'});
    expect(apiNotification.button).toEqual({text: 'b'});

    apiNotification.updateNotification(NotificationTypeEnum.Error, {value: 'b'});
    expect(apiNotification.button).toEqual({
      icon: 'refresh',
      text: 'Try Again',
      action: NotificationActions.Reload
    });
  });

  it('should call updateNotification() when loader is changed', () => {
    spyOn(apiNotification, 'updateNotification');
    coreApiStateService.loader$.next(true);
    expect(apiNotification.updateNotification).toHaveBeenCalledTimes(1);
    expect(apiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.Loader);

    coreApiStateService.loader$.next(false);
    expect(apiNotification.updateNotification).toHaveBeenCalledTimes(2);
    expect(apiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.None);
  });

  it('should call updateNotification() when error is changed', () => {
    spyOn(apiNotification, 'updateNotification');
    coreApiStateService.error$.next('a');
    expect(apiNotification.updateNotification).toHaveBeenCalledTimes(1);
    expect(apiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.Error, 'a');

    coreApiStateService.error$.next(null);
    expect(apiNotification.updateNotification).toHaveBeenCalledTimes(2);
    expect(apiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.None, null);
  });
});
