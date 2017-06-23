import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WatchlistComponent} from './watchlist.component';
import {HeaderStateService} from '../shared/header/state/header-state.service';

@Component({selector: 'mp-content', template: ''})
class ContentComponent {
}

@Component({selector: 'mp-sidebar', template: ''})
class SidebarComponent {
}

describe('WatchlistComponent', () => {
  let fixture: ComponentFixture<WatchlistComponent>;
  let component: WatchlistComponent;
  let headerState: any;

  beforeEach(async(() => {
    headerState = jasmine.createSpyObj('headerStateService', [
      'changeSidebar'
    ]);

    headerState.sidebar$ = new BehaviorSubject<any>(true);

    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        WatchlistComponent,
        ContentComponent,
        SidebarComponent
      ],
      providers: [
        {provide: HeaderStateService, useValue: headerState}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ContentComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-content')).not.toBe(null);
  });

  it('should have a SidebarComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-sidebar')).not.toBe(null);
  });

  it('should initialize property `sidebar` with boolean value `true`', () => {
    expect(component.sidebar).toBe(true);
  });

  it('should add css class `mp-inactive` to `mdl-layout__drawer` when sidebar is false', () => {
    const element: any = fixture.nativeElement.querySelector('.mdl-layout__drawer');
    expect(element.classList).not.toContain('mp-inactive');

    headerState.sidebar$.next(false);
    fixture.detectChanges();
    expect(element.classList).toContain('mp-inactive');
  });
});
