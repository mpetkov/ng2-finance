/* tslint:disable:no-unused-variable */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CoreApiStateService } from './state/api-state.service';
import {
  CoreApiNotification,
  NotificationActions
} from './index';
import { NotificationTypeEnum } from '../shared/index';

export function main() {
  describe('CoreApiNotification', () => {
    let coreApiNotification:CoreApiNotification;
    let coreApiStateService:any;
    let apiService:any;

    beforeEach(() => {
      coreApiStateService = jasmine.createSpyObj('coreApiStateService', [
        'fetchLoader'
      ]);

      apiService = jasmine.createSpyObj('apiService', [
        'reload'
      ]);

      coreApiStateService.loader$ = new BehaviorSubject<any>(false);
      coreApiStateService.error$ = new BehaviorSubject<any>(null);
      coreApiNotification = new CoreApiNotification(coreApiStateService, apiService);
    });

    it('should call apiService#reload() when notificationAction() is called', () => {
      coreApiNotification.notificationAction('a');
      expect(apiService.reload).toHaveBeenCalledTimes(0);

      coreApiNotification.notificationAction('reload');
      expect(apiService.reload).toHaveBeenCalledTimes(1);
    });


    it('should set notificationType when updateNotification() is called', () => {
      coreApiNotification.updateNotification(NotificationTypeEnum.Loader);
      expect(coreApiNotification.notificationType).toBe(NotificationTypeEnum.Loader);
    });

    it('should set notification when updateNotification() is called', () => {
      coreApiNotification.updateNotification(NotificationTypeEnum.Notification, 'a');
      expect(coreApiNotification.notification).toBe('a');

      coreApiNotification.updateNotification(NotificationTypeEnum.Error, {value:'b'});
      expect(coreApiNotification.notification).toBe('b');
    });

    it('should set button when updateNotification() is called', () => {
      coreApiNotification.updateNotification(NotificationTypeEnum.Notification, 'a', {text:'b'});
      expect(coreApiNotification.button).toEqual({text:'b'});

      coreApiNotification.updateNotification(NotificationTypeEnum.Error, {value:'b'});
      expect(coreApiNotification.button).toEqual({
        icon: 'refresh',
        text: 'Try Again',
        action: NotificationActions.Reload
      });
    });

    it('should call updateNotification() when loader is changed', () => {
      spyOn(coreApiNotification, 'updateNotification');
      coreApiStateService.loader$.next(true);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledTimes(1);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.Loader);

      coreApiStateService.loader$.next(false);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledTimes(2);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.None);
    });

    it('should call updateNotification() when error is changed', () => {
      spyOn(coreApiNotification, 'updateNotification');
      coreApiStateService.error$.next('a');
      expect(coreApiNotification.updateNotification).toHaveBeenCalledTimes(1);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.Error, 'a');

      coreApiStateService.error$.next(null);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledTimes(2);
      expect(coreApiNotification.updateNotification).toHaveBeenCalledWith(NotificationTypeEnum.None, null);
    });
  });
}
