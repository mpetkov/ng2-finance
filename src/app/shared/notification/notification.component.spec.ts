import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {NotificationComponent, NotificationTypeEnum} from './notification.component';

describe('NotificationComponent', () => {
  let fixture: ComponentFixture<NotificationComponent>;
  let component: NotificationComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule
      ],
      declarations: [
        NotificationComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a notification when type is Notification', () => {
    expect(fixture.nativeElement.querySelector('b')).toBeNull();

    component.type = NotificationTypeEnum.Notification;
    component.value = 'notification';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('b').textContent).toBe('notification');
  });

  it('should show an error when type is Error', () => {
    expect(fixture.nativeElement.querySelector('b')).toBeNull();

    component.type = NotificationTypeEnum.Error;
    component.value = 'error';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').classList).toContain('mdl-color-text--red');
    expect(fixture.nativeElement.querySelector('b').textContent).toBe('error');
  });

  it('should show an loader when type is Loader', () => {
    expect(fixture.nativeElement.querySelector('.mp-loader')).toBeNull();

    component.type = NotificationTypeEnum.Loader;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-loader')).not.toBeNull();
  });

  it('should show a button when button options are present', () => {
    expect(fixture.nativeElement.querySelector('button')).toBeNull();

    component.button = {};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).not.toBeNull();
  });

  it('should call action#emit() when button is clicked', () => {
    spyOn(component.action, 'emit');

    component.button = {action: 'action'};
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(component.action.emit).toHaveBeenCalledTimes(1);
    expect(component.action.emit).toHaveBeenCalledWith('action');
  });
});
