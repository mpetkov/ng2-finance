/* tslint:disable:no-unused-variable */

import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MdlModule } from 'angular2-mdl';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  AppComponent,
  AppStateService
} from './index';

@Component({selector: 'mp-header', template: ''})
class HeaderComponent {}

export function main() {
  describe('AppComponent', () => {
    let fixture:ComponentFixture<AppComponent>;
    let component:AppComponent;
    let appState:any;

    beforeEach(async(() => {
      appState = jasmine.createSpyObj('appStateService', [
        'changePreloader'
      ]);

      appState.preloader$ = new BehaviorSubject<any>(true);

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
          {provide: AppStateService, useValue: appState}
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
      component.preloaderDiv = {className: ''};
      fixture.detectChanges();
      expect(component.preloaderDiv.className).not.toContain('mp-loaded');

      appState.preloader$.next(false);
      fixture.detectChanges();
      expect(component.preloaderDiv.className).toContain('mp-loaded');
    });
  });
}
