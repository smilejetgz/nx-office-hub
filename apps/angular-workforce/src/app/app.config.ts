import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  provideAppInitializer,
  inject,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { appRoutes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AppInitializerProvider } from './app-initializer.service';
import { ThemeService } from '@nx-office-hub/themes';
import { LayoutService } from '@nx-office-hub/layouts';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideAppInitializer(async () => {
      const themeService = inject(ThemeService);
      const layoutService = inject(LayoutService);

      try {
        await Promise.resolve();
        layoutService.loadCollapsedFromLocalStorage();
        themeService.loadThemeFromLocalStorage();
      } catch (error) {
        console.error('APP_INITIALIZER error:', error);
      }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
