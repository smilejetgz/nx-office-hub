import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppInitializerProvider } from '@nx-office-hub/ui';
import { provideEchartsCore } from 'ngx-echarts';
import { appRoutes } from './app.routes';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideEchartsCore({
      echarts: () => import('echarts'),
    }),
    ...AppInitializerProvider,
    importProvidersFrom(FormsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
