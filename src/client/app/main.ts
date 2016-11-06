import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

if (String('<%= BUILD_TYPE %>') === 'prod') { enableProdMode(); }


platformBrowserDynamic().bootstrapModule(AppModule);
