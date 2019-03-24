import {
  CompilerOptions,
  enableProdMode,
  MissingTranslationStrategy,
  TRANSLATIONS,
  TRANSLATIONS_FORMAT,
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
const translations = require(`raw-loader!./locale/messages.de.xlf`);

const compilerOptions: CompilerOptions = {
  providers: [
    { provide: TRANSLATIONS, useValue: translations },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
  ],
};
if (environment.production) {
  compilerOptions.missingTranslation = MissingTranslationStrategy.Error;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, compilerOptions)
  .catch(err => console.error(err));
