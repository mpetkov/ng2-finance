import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

if (String('<%= BUILD_TYPE %>') === 'prod') {
  enableProdMode();
}

function detectIE() {
  var ua = window.navigator.userAgent;
  if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
    return true;
  } else {
    return false;
  }
}

if (detectIE()) {
  document.body.classList.add('old-ie');
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

