import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'normalize-css/normalize.css', inject: true},
      {src: 'moment/min/moment.min.js', inject: true}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ENABLE_SCSS = true;

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
    this.addPackageBundles({
      name: 'angular2-mdl',
      path: 'node_modules/angular2-mdl/bundle/angular2-mdl.js',
      packageMeta: {
        main: 'components/index.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'lodash',
      path: 'node_modules/lodash/lodash.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: '@ngrx/core',
      path: 'node_modules/@ngrx/core/bundles/core.umd.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: '@ngrx/store',
      path: 'node_modules/@ngrx/store/bundles/store.umd.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'immutable',
      path: 'node_modules/immutable/dist/immutable.js',
      packageMeta: {
        main: 'dist/immutable.js',
        defaultExtension: 'js'
      }
    });
  }

}
