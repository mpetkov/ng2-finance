import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {MdlModule} from 'angular2-mdl';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppComponent} from './app.component';
import {HeaderStateService} from './shared/header/state/header-state.service';

@Component({selector: 'mp-header', template: ''})
class HeaderComponent {
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let headerState: any;

  beforeEach(async(() => {
    headerState = jasmine.createSpyObj('headerStateService', [
      'changePreloader'
    ]);

    headerState.preloader$ = new BehaviorSubject<any>(true);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MdlModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        {provide: HeaderStateService, useValue: headerState}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a HeaderComponent', () => {
    expect(fixture.nativeElement.querySelector('mp-header')).not.toBe(null);
  });

  it('should have a RouterOutlet', () => {
    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBe(null);
  });

  it('should add css class `mp-loaded` to preloader when it is disabled', () => {
    fixture.detectChanges();
    expect(document.body.className).not.toContain('mp-loaded');

    headerState.preloader$.next(false);
    fixture.detectChanges();
    expect(document.body.className).toContain('mp-loaded');
  });
});
