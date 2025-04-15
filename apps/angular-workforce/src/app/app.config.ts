import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { appRoutes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AppInitializerProvider } from '@nx-office-hub/layouts';
import { provideEchartsCore } from 'ngx-echarts';

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
