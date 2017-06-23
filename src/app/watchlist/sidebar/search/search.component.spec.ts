import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WatchlistStateService} from '../../state/watchlist-state.service';
import {NotificationButtonInterface, NotificationTypeEnum} from '../../../shared/notification/notification.component';
import {HeaderStateService} from '../../../shared/header/state/header-state.service';
import {SearchComponent} from './search.component';
import {SearchApiService} from './search-api.service';
import {SearchStateService} from './state/search-state.service';
import {SidebarStateService} from '../state/sidebar-state.service';
import {FavoritesStateService} from '../favorites/state/favorites-state.service';
import {SidebarTypeEnum} from '../state/sidebar-state';

@Component({selector: 'mp-notification', template: ''})
class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let api: any;
  let searchState: any;
  let sidebarState: any;
  let favoritesState: any;
  let watchlistState: any;
  let headerState: any;
  let router: any;

  beforeEach(async(() => {
    api = jasmine.createSpyObj('api', ['load']);

    searchState = jasmine.createSpyObj('searchStateService', ['fetchFulfilled']);
    searchState.data$ = new BehaviorSubject<any>([]);
    searchState.loader$ = new BehaviorSubject<any>(false);
    searchState.error$ = new BehaviorSubject<any>(null);

    sidebarState = jasmine.createSpyObj('sidebarStateService', ['changeType']);

    favoritesState = jasmine.createSpyObj('favoritesStateService', ['changeOrder']);
    favoritesState.order$ = new BehaviorSubject<any>([]);

    watchlistState = jasmine.createSpyObj('watchlistStateService', ['addFavorite']);

    headerState = jasmine.createSpyObj('headerStateService', ['changeSearch']);
    headerState.search$ = new BehaviorSubject<any>(null);

    router = jasmine.createSpyObj('router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        SearchComponent,
        NotificationComponent
      ],
      providers: [
        {provide: SearchApiService, useValue: api},
        {provide: SearchStateService, useValue: searchState},
        {provide: SidebarStateService, useValue: sidebarState},
        {provide: FavoritesStateService, useValue: favoritesState},
        {provide: WatchlistStateService, useValue: watchlistState},
        {provide: HeaderStateService, useValue: headerState},
        {provide: Router, useValue: router}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a NotificationComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-notification')).not.toBe(null);
  });

  it('should show the search list when stocks are present', () => {
    expect(fixture.nativeElement.querySelector('ul')).toBeNull();

    headerState.search$.next('search');
    searchState.data$.next([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ul')).toBeNull();

    searchState.data$.next([{symbol: 'symbol'}]);
    searchState.loader$.next(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(1);
  });

  it('should display the stock info correctly when stock is present', () => {
    searchState.data$.next([{symbol: 'symbol', name: 'name', typeDisp: 'typeDisp', exchDisp: 'exchDisp'}]);
    searchState.loader$.next(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mdl-color-text--black').textContent).toBe('symbol - name');
    expect(fixture.nativeElement.querySelector('.mdl-list__item-sub-title').textContent).toBe('typeDisp - exchDisp');
  });

  it('should call FavoritesStateService#changeOrder() when list item is clicked', () => {
    searchState.data$.next([{symbol: 'symbol'}]);
    searchState.loader$.next(false);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('li').click();
    expect(favoritesState.changeOrder).toHaveBeenCalledTimes(1);
    expect(favoritesState.changeOrder).toHaveBeenCalledWith(['symbol']);
  });

  it('should call WatchlistStateService#addFavorite() when list item is clicked', () => {
    searchState.data$.next([{symbol: 'symbol'}]);
    searchState.loader$.next(false);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('li').click();
    expect(watchlistState.addFavorite).toHaveBeenCalledTimes(1);
    expect(watchlistState.addFavorite).toHaveBeenCalledWith('symbol');
  });

  it('should call SidebarStateService#changeType() when list item is clicked', () => {
    searchState.data$.next([{symbol: 'symbol'}]);
    searchState.loader$.next(false);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('li').click();
    expect(sidebarState.changeType).toHaveBeenCalledTimes(1);
    expect(sidebarState.changeType).toHaveBeenCalledWith(SidebarTypeEnum.List);
  });

  it('should call Router#navigate() when list item is clicked', () => {
    searchState.data$.next([{symbol: 'symbol'}]);
    searchState.loader$.next(false);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('li').click();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/watchlist', 'symbol']);
  });

  it('should call SearchApiService#load() when search is updated', () => {
    headerState.search$.next('search');
    expect(api.load).toHaveBeenCalledTimes(1);
    expect(api.load).toHaveBeenCalledWith('search');
  });
});
