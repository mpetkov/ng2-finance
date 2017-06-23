import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {EditComponent} from './edit.component';
import {FavoritesStateService} from '../favorites/state/favorites-state.service';
import {SidebarStateService} from '../state/sidebar-state.service';
import {EditService} from './edit.service';
import {SidebarTypeEnum} from '../state/sidebar-state';
@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
}

describe('EditComponent', () => {
  let fixture: ComponentFixture<EditComponent>;
  let component: EditComponent;
  let favoritesState: any;
  let sidebarState: any;
  let headerState: any;
  let watchlistState: any;
  let editService: any;

  beforeEach(async(() => {
    favoritesState = jasmine.createSpyObj('favoritesStateService', [
      'changeOrder'
    ]);

    favoritesState.data$ = new BehaviorSubject<any>([]);

    sidebarState = jasmine.createSpyObj('sidebarStateService', [
      'changeType'
    ]);

    headerState = jasmine.createSpyObj('headerStateService', [
      'changeSearchActive'
    ]);

    watchlistState = jasmine.createSpyObj('watchlistStateService', [
      'deleteFavorites'
    ]);

    watchlistState.favorites$ = new BehaviorSubject<any>([]);

    editService = jasmine.createSpyObj('editService', [
      'getOrder',
      'getDragOptions'
    ]);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule,
        DragulaModule
      ],
      declarations: [
        EditComponent,
        NotificationComponent
      ],
      providers: [
        {provide: FavoritesStateService, useValue: favoritesState},
        {provide: SidebarStateService, useValue: sidebarState},
        {provide: HeaderStateService, useValue: headerState},
        {provide: WatchlistStateService, useValue: watchlistState},
        {provide: EditService, useValue: editService},
        DragulaService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a NotificationComponent', () => {
    component.notification = 'notification';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBeNull();
  });

  it('should have a title', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toBe('Edit');
  });

  it('should show content when notification is empty', () => {
    expect(fixture.nativeElement.querySelector('.mdl-navigation')).not.toBeNull();

    component.notification = 'notification';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-navigation')).toBeNull();
  });

  it('should call HeaderStateService#changeSearchActive() when add button is clicked', () => {
    fixture.nativeElement.querySelector('.mp-add').click();
    expect(headerState.changeSearchActive).toHaveBeenCalledTimes(1);
    expect(headerState.changeSearchActive).toHaveBeenCalledWith(true);
  });

  it('should call SidebarStateService#changeType() when close button is clicked', () => {
    fixture.nativeElement.querySelector('.mp-close').click();
    expect(sidebarState.changeType).toHaveBeenCalledTimes(1);
    expect(sidebarState.changeType).toHaveBeenCalledWith(SidebarTypeEnum.List);
  });

  it('should call WatchlistStateService#deleteFavorites() when close button is clicked with deleted items present', () => {
    component.deleted = ['a'];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-close').click();
    expect(watchlistState.deleteFavorites).toHaveBeenCalledTimes(1);
    expect(watchlistState.deleteFavorites).toHaveBeenCalledWith(['a']);
  });

  it('should add class mp-active when the remove button is clicked', () => {
    watchlistState.favorites$.next(['a']);
    favoritesState.data$.next([{symbol: 'a'}]);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-remove').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-tab').classList).toContain('mp-active');

    fixture.nativeElement.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-tab').classList).not.toContain('mp-active');
  });

  it('should add stock to deleted list when the delete button is clicked', () => {
    watchlistState.favorites$.next(['a', 'b']);
    favoritesState.data$.next([{symbol: 'a'}, {symbol: 'b'}]);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-delete').click();
    fixture.detectChanges();
    expect(component.deleted).toEqual(['a']);
    expect(fixture.nativeElement.querySelectorAll('.mdl-navigation__link')[0].classList).toContain('mp-hide');
  });

  it('should show a notification when all stocks are deleted', () => {
    watchlistState.favorites$.next(['a']);
    favoritesState.data$.next([{symbol: 'a'}]);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-delete').click();
    fixture.detectChanges();
    expect(component.deleted).toEqual(['a']);
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBeNull();
    expect(component.notification).toBe('Your favorites is empty');
  });
});
