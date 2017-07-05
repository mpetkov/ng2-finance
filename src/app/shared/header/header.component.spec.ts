import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HeaderComponent} from './header.component';
import {HeaderStateService} from './state/header-state.service';

@Component({selector: 'mp-search-box', template: ''})
class SearchBoxComponent {
  @Input() value: string;
  @Input() active: boolean;
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let headerState: any;

  beforeEach(async(() => {
    headerState = jasmine.createSpyObj('headerStateService', [
      'toggleSearch',
      'changeSidebar',
      'changeSearchActive',
      'changeSearch'
    ]);

    headerState.searchActive$ = new BehaviorSubject<any>(false);
    headerState.sidebar$ = new BehaviorSubject<any>(false);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MdlModule
      ],
      declarations: [
        HeaderComponent,
        SearchBoxComponent
      ],
      providers: [
        {provide: HeaderStateService, useValue: headerState}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a SearchBoxComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-search-box')).not.toBe(null);
  });

  it('should have a title', () => {
    expect(fixture.nativeElement.querySelector('.mdl-layout-title').textContent).toBe('Ng2 Finance');
  });

  it('should initialize property `sidebar` with boolean value `false`', () => {
    expect(component.sidebar).toBe(false);
  });

  it('should initialize property `active` with boolean value `false`', () => {
    expect(component.active).toBe(false);
  });

  it('should add css class `mp-active-search` to container when search box is activated', () => {
    const element: any = fixture.nativeElement.querySelector('mdl-layout-header-row');
    expect(element.classList).not.toContain('mp-active-search');

    headerState.searchActive$.next(true);
    fixture.detectChanges();
    expect(element.classList).toContain('mp-active-search');
  });

  it('should show the arrow icon when sidebar is disabled', () => {
    expect(fixture.nativeElement.querySelector('.mp-arrow')).not.toBeNull();

    headerState.sidebar$.next(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mp-arrow')).toBeNull();
  });

  it('should call HeaderStateService#changeSidebar() when arrow button is clicked', () => {
    fixture.nativeElement.querySelector('.mp-arrow').click();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(1);
    expect(headerState.changeSidebar).toHaveBeenCalledWith(true);
  });

  it('should call HeaderStateService#changeSearchActive() when search button is clicked', () => {
    fixture.nativeElement.querySelector('.mp-search').click();
    expect(headerState.changeSearchActive).toHaveBeenCalledTimes(1);
    expect(headerState.changeSearchActive).toHaveBeenCalledWith(true);
  });

  it('should call HeaderStateService#changeSearchActive() when close button is clicked', () => {
    fixture.nativeElement.querySelector('.mp-close').click();
    expect(headerState.changeSearchActive).toHaveBeenCalledTimes(1);
    expect(headerState.changeSearchActive).toHaveBeenCalledWith(false);
  });

  it('should call HeaderStateService#changeSearch() when updateSearch() is called', () => {
    component.updateSearch('search');
    expect(headerState.changeSearch).toHaveBeenCalledTimes(1);
    expect(headerState.changeSearch).toHaveBeenCalledWith('search');
  });

  it('should call HeaderStateService#changeSearchActive() when activateSearch() is called', () => {
    component.activateSearch(true);
    expect(headerState.changeSearchActive).toHaveBeenCalledTimes(1);
    expect(headerState.changeSearchActive).toHaveBeenCalledWith(true);
  });

  it('should call HeaderStateService#changeSidebar() when search box is activated and deactivated', () => {
    headerState.searchActive$.next(true);
    fixture.detectChanges();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(1);

    headerState.searchActive$.next(false);
    fixture.detectChanges();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(1);

    headerState.searchActive$.next(true);
    fixture.detectChanges();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(2);

    component.sidebar = true;
    headerState.searchActive$.next(false);
    fixture.detectChanges();
    expect(headerState.changeSidebar).toHaveBeenCalledTimes(3);
  });
});
