import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WatchlistStateService} from '../state/watchlist-state.service';
import {HeaderStateService} from '../../shared/header/state/header-state.service';
import {SidebarComponent} from './sidebar.component';
import {SidebarTypeEnum} from './state/sidebar-state';
import {FavoritesApiService} from './favorites-api.service';
import {SidebarStateService} from './state/sidebar-state.service';

@Component({selector: 'mp-favorites', template: ''})
class FavoritesComponent {
}

@Component({selector: 'mp-search', template: ''})
class SearchComponent {
}

@Component({selector: 'mp-edit', template: ''})
class EditComponent {
}

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;
  let api: any;
  let sidebarState: any;
  let watchlistState: any;
  let headerState: any;
  let params: Subject<any>;

  beforeEach(async(() => {
    api = jasmine.createSpyObj('api', ['load']);

    sidebarState = jasmine.createSpyObj('sidebarStateService', [
      'changeType'
    ]);

    sidebarState.type$ = new BehaviorSubject<any>(SidebarTypeEnum.List);

    watchlistState = jasmine.createSpyObj('watchlistStateService', [
      'changeStock'
    ]);

    watchlistState.favorites$ = new BehaviorSubject<any>([]);
    watchlistState.stock$ = new BehaviorSubject<any>(null);

    headerState = jasmine.createSpyObj('headerStateService', [
      'changeSearchActive'
    ]);

    headerState.searchActive$ = new BehaviorSubject<any>(false);

    params = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        SidebarComponent,
        EditComponent,
        FavoritesComponent,
        SearchComponent
      ],
      providers: [
        {provide: FavoritesApiService, useValue: api},
        {provide: SidebarStateService, useValue: sidebarState},
        {provide: WatchlistStateService, useValue: watchlistState},
        {provide: HeaderStateService, useValue: headerState},
        {provide: ActivatedRoute, useValue: {params: params}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct component based on the type', () => {
    expect(fixture.nativeElement.querySelector('mp-favorites')).not.toBe(null);
    expect(fixture.nativeElement.querySelector('mp-edit')).toBe(null);
    expect(fixture.nativeElement.querySelector('mp-search')).toBe(null);

    sidebarState.type$.next(SidebarTypeEnum.Edit);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mp-favorites')).toBe(null);
    expect(fixture.nativeElement.querySelector('mp-edit')).not.toBe(null);
    expect(fixture.nativeElement.querySelector('mp-search')).toBe(null);

    sidebarState.type$.next(SidebarTypeEnum.Add);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mp-favorites')).toBe(null);
    expect(fixture.nativeElement.querySelector('mp-edit')).toBe(null);
    expect(fixture.nativeElement.querySelector('mp-search')).not.toBe(null);
  });

  it('should call SidebarStateService#changeType() when searchActive is changed', () => {
    expect(sidebarState.changeType).toHaveBeenCalledTimes(1);

    headerState.searchActive$.next(true);
    expect(sidebarState.changeType).toHaveBeenCalledTimes(2);
    expect(sidebarState.changeType).toHaveBeenCalledWith(SidebarTypeEnum.List);

    headerState.searchActive$.next(false);
    expect(sidebarState.changeType).toHaveBeenCalledTimes(3);
    expect(sidebarState.changeType).toHaveBeenCalledWith(SidebarTypeEnum.Add);
  });

  it('should call WatchlistStateService#changeStock() when route is changed', () => {
    params.next({id: 'test'});
    expect(watchlistState.changeStock).toHaveBeenCalledTimes(1);
    expect(watchlistState.changeStock).toHaveBeenCalledWith('test');
  });

  it('should call FavoritesApiService#load() when stock is changed', () => {
    expect(api.load).toHaveBeenCalledTimes(2);

    watchlistState.stock$.next('AAPL');
    expect(api.load).toHaveBeenCalledTimes(3);
    expect(api.load).toHaveBeenCalledWith(['AAPL']);

    watchlistState.stock$.next('AAPL');
    expect(api.load).toHaveBeenCalledTimes(3);
  });

  it('should call FavoritesApiService#load() when favorites is changed', () => {
    expect(api.load).toHaveBeenCalledTimes(2);

    watchlistState.stock$.next('AAPL');
    expect(api.load).toHaveBeenCalledTimes(3);
    expect(api.load).toHaveBeenCalledWith(['AAPL']);

    watchlistState.favorites$.next(['FB']);
    expect(api.load).toHaveBeenCalledTimes(4);
    expect(api.load).toHaveBeenCalledWith(['FB', 'AAPL']);

    watchlistState.favorites$.next(['AAPL']);
    expect(api.load).toHaveBeenCalledTimes(5);
    expect(api.load).toHaveBeenCalledWith(['AAPL']);
  });
});
