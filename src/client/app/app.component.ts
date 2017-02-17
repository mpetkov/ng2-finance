import { Component } from '@angular/core';
import { AppStateService } from './state/app-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  preloaderDiv:any;
  constructor(private appState:AppStateService) {
    this.preloaderDiv = document.getElementsByClassName('mp-preloader')[0];

    let sub = appState.preloader$.subscribe(
      preloader => {
        if (!preloader && this.preloaderDiv) {
          this.preloaderDiv.className += ' mp-loaded';
          sub.unsubscribe();
        }
      }
    );
  }
}
