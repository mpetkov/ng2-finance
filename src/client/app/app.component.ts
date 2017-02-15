import { Component } from '@angular/core';
import { AppStateService } from './state/app-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(private appState:AppStateService) {
    let preloaderDiv:Element = document.getElementsByClassName('mp-preloader')[0];

    let sub = appState.preloader$.subscribe(
      preloader => {
        if (!preloader && preloaderDiv) {
          preloaderDiv.classList.add('mp-loaded');
          sub.unsubscribe();
        }
      }
    );
  }
}
