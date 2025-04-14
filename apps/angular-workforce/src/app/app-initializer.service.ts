import { ThemeService } from '@nx-office-hub/themes';
import { inject } from '@angular/core';
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';

export const AppInitializerProvider = [
  { provide: NZ_I18N, useValue: th_TH },
  {
    provide: 'APP_INITIALIZER',
    useFactory: () => {
      const themeService = inject(ThemeService);
      return async () => {
        try {
          themeService.loadThemeFromLocalStorage();
          console.log('Theme loaded successfully from localStorage');
        } catch (error) {
          console.error('Error loading theme from localStorage:', error);
        }
      };
    },
    multi: true,
  },
];
