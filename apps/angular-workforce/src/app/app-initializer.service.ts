import { ThemeService } from '@nx-office-hub/themes';
import { provideAppInitializer } from '@angular/core';
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';

export const AppInitializerProvider = [
  { provide: NZ_I18N, useValue: th_TH },
  provideAppInitializer(async () => {
    const themeService = new ThemeService();
    try {
      await themeService.loadThemeLocalStorage();
      console.log('Theme loaded successfully from localStorage');
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }),
];
