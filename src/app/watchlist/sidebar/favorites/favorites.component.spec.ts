import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {NotificationButtonInterface, NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {FavoritesHighlightService} from './favorites-highlight.service';
import {FavoriteNotificationActions, FavoritesComponent} from './favorites.component';
import {FavoritesStateService} from './state/favorites-state.service';
import {FavoritesApiService} from '../favorites-api.service';
import {SidebarStateService} from '../state/sidebar-state.service';
import {SidebarTypeEnum} from '../state/sidebar-state';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
}

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let component: FavoritesComponent;
  let watchlistState: any;
  let favoritesState: any;
  let api: any;
  let favoritesHighlightService: any;
  let sidebarState: any;
  let headerState: any;
  let router: any;

  beforeEach(async(() => {
    watchlistState = jasmine.createSpyObj('watchlistState', [
      'changeHighlights',
      'changeStockData'
    ]);
    watchlistState.favorites$ = new BehaviorSubject<any>(['AAPL', 'GOOG', 'FB']);
    watchlistState.stock$ = new BehaviorSubject<any>(null);
    watchlistState.highlights$ = new BehaviorSubject<any>({});

    favoritesState = jasmine.createSpyObj('favoritesState', [
      'sortData'
    ]);

    favoritesState.data$ = new BehaviorSubject<any>([]);
    favoritesState.loader$ = new BehaviorSubject<any>(false);
    favoritesState.error$ = new BehaviorSubject<any>(null);
    favoritesState.order$ = new BehaviorSubject<any>([]);

    api = jasmine.createSpyObj('api', [
      'reload'
    ]);

    favoritesHighlightService = jasmine.createSpyObj('favoritesHighlightService', [
      'getHighlights',
      'getLastLoadedData'
    ]);

    sidebarState = jasmine.createSpyObj('sidebarState', [
      'changeType'
    ]);

    headerState = jasmine.createSpyObj('headerStateService', [
      'changeSearchActive',
      'changeSidebar'
    ]);

    headerState.sidebar$ = new BehaviorSubject<any>([]);

    router = jasmine.createSpyObj('router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule
      ],
      declarations: [
        FavoritesComponent,
        NotificationComponent
      ],
      providers: [
        {provide: WatchlistStateService, useValue: watchlistState},
        {provide: FavoritesStateService, useValue: favoritesState},
        {provide: FavoritesApiService, useValue: api},
        {provide: FavoritesHighlightService, useValue: favoritesHighlightService},
        {provide: SidebarStateService, useValue: sidebarState},
        {provide: HeaderStateService, useValue: headerState},
        {provide: Router, useValue: router}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a NotificationComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBeNull();
  });

  it('should have a title', () => {
    expect(fixture.nativeElement.querySelector('h4').textContent).toBe('Favorites');
  });

  it('should show content when notification is empty', () => {
    expect(fixture.nativeElement.querySelector('.mdl-navigation')).toBeNull();

    component.notificationType = 0;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-navigation')).not.toBeNull();
  });

  it('should show edit menu item if there is data already loaded', () => {
    expect(fixture.nativeElement.querySelector('.mp-edit')).toBeNull();

    component.favoritesData = [{}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-edit')).not.toBeNull();
  });

  it('should show reload menu item if there is data already loaded', () => {
    expect(fixture.nativeElement.querySelector('.mp-reload')).toBeNull();

    component.favoritesData = [{}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-reload')).not.toBeNull();
  });

  it('should add class mp-active when the row is the currently selected stock', () => {
    component.notificationType = 0;
    component.favoritesData = [{symbol: 'a'}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-navigation__link').classList).not.toContain('mp-active');

    component.stock = 'a';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-navigation__link').classList).toContain('mp-active');
  });

  it('should add transition color class when the row has a highlight applied', () => {
    component.notificationType = 0;
    component.favoritesData = [{symbol: 'a'}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-highlight').classList).not.toContain('color');

    watchlistState.highlights$.next({a: {price: 'color'}});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-highlight').classList).toContain('color');
  });

  it('should add green/red color class to the pill depending if the value is negative or positive', () => {
    component.notificationType = 0;
    component.favoritesData = [{symbol: 'a', change: '10'}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-pill').classList).toContain('mdl-color--green-A700');

    component.favoritesData = [{symbol: 'a', change: '-10'}];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-pill').classList).toContain('mdl-color--red');
  });

  it('should call SidebarStateService#changeType() when edit menu is clicked', () => {
    component.favoritesData = [{}];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-edit').click();
    expect(sidebarState.changeType).toHaveBeenCalledTimes(1);
    expect(sidebarState.changeType).toHaveBeenCalledWith(SidebarTypeEnum.Edit);
  });

  it('should call HeaderStateService#changeSearchActive() when add menu is clicked', () => {
    fixture.nativeElement.querySelector('.mp-add').click();
    expect(headerState.changeSearchActive).toHaveBeenCalledTimes(1);
    expect(headerState.changeSearchActive).toHaveBeenCalledWith(true);
  });

  it('should call FavoritesApiService#reload() when reload menu is clicked', () => {
    component.favoritesData = [{}];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-reload').click();
    expect(api.reload).toHaveBeenCalledTimes(1);
  });

  it('should call Router#navigate() when stock row is clicked', () => {
    component.notificationType = 0;
    component.favoritesData = [{symbol: 'a'}];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mdl-navigation__link').click();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/watchlist', 'a']);
  });

  it('should call HeaderStateService#changeSidebar() when stock row is clicked and sidebar is present', () => {
    component.notificationType = 0;
    headerState.sidebar$.next(true);
    component.favoritesData = [{symbol: 'a'}];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mdl-navigation__link').click();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(1);
    expect(headerState.changeSidebar).toHaveBeenCalledWith(false);

    headerState.sidebar$.next(false);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mdl-navigation__link').click();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(1);
  });

  it('should toggle pillType when pill is clicked', () => {
    expect(component.pillType).toBe('change');

    component.notificationType = 0;
    headerState.sidebar$.next(true);
    component.favoritesData = [{symbol: 'a'}];
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.mp-pill').click();
    fixture.detectChanges();
    expect(component.pillType).toBe('percentage');


    fixture.nativeElement.querySelector('.mp-pill').click();
    fixture.detectChanges();
    expect(component.pillType).toBe('change');
  });

  it('should call add() when notificationAction() is called with type Add', () => {
    spyOn(component, 'add');

    component.notificationAction('');
    expect(component.add).toHaveBeenCalledTimes(0);

    component.notificationAction(FavoriteNotificationActions.Add);
    expect(component.add).toHaveBeenCalledTimes(1);
  });


  it('should call FavoritesApiService#reload() when favoritesDat is updated after a certain timeout', () => {
    jasmine.clock().uninstall();
    jasmine.clock().install();

    favoritesState.data$.next([{symbol: 'AAPL'}]);
    fixture.detectChanges();
    expect(api.reload).toHaveBeenCalledTimes(0);

    jasmine.clock().tick(10001);
    expect(api.reload).toHaveBeenCalledTimes(1);

    favoritesState.data$.next([{symbol: 'GOOG'}]);
    fixture.detectChanges();
    jasmine.clock().tick(10001);
    expect(api.reload).toHaveBeenCalledTimes(2);

    jasmine.clock().uninstall();
  });
});
