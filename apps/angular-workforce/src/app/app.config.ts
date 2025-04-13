import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { appRoutes } from './app.routes';
import { en_US, NZ_I18N, provideNzI18n, th_TH } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AppInitializerProvider } from './app-initializer.service';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    AppInitializerProvider,
    { provide: NZ_I18N, useValue: th_TH },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
