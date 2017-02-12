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
    this.APP_TITLE = 'Ng2 Finance';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'normalize-css/normalize.css', inject: true},
      {src: 'dragula/dist/dragula.min.css', inject: true},
      {src: 'lodash/lodash.min.js', inject: true},
      {src: 'moment/min/moment.min.js', inject: true},
      {src: 'css-layout/src/Layout.js', inject: true},
      {src: 'd3/d3.min.js', inject: true},
      {src: 'd3fc/dist/d3fc.min.js', inject: true},
      {src: 'd3fc/dist/d3fc.min.css', inject: true}
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
      packageMeta: {
        main: 'bundles/core.umd.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: '@ngrx/store',
      packageMeta: {
        main: 'bundles/store.umd.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'immutable',
      packageMeta: {
        main: 'dist/immutable.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'dragula',
      path: 'node_modules/dragula/dist/dragula.min.js',
      packageMeta: {
        main: 'dragula.js',
        defaultExtension: 'js'
      }
    });

    this.addPackageBundles({
      name: 'ng2-dragula',
      path: 'node_modules/ng2-dragula/ng2-dragula.js',
      packageMeta: {
        main: 'index.js',
        defaultExtension: 'js'
      }
    });
  }
}
