import { ThemeService } from '@nx-office-hub/themes';
import { LayoutService } from '@nx-office-hub/layouts';
import { APP_INITIALIZER, inject } from '@angular/core';
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';

export const AppInitializerProvider = [
  { provide: NZ_I18N, useValue: th_TH },
  {
    provide: APP_INITIALIZER, // เปลี่ยนจาก string เป็น InjectionToken
    useFactory: () => {
      const themeService = inject(ThemeService);
      const layoutService = inject(LayoutService); // แก้ไขการ inject

      // ต้อง return function ที่จะถูกเรียกตอน initialization
      return () => {
        try {
          themeService.loadThemeFromLocalStorage();
          console.log('Theme loaded successfully from localStorage');
        } catch (error) {
          console.error('Error loading theme from localStorage:', error);
        }

        try {
          layoutService.loadCollapsedFromLocalStorage();
          console.log(
            'Layout collapsed state loaded successfully from localStorage'
          );
        } catch (error) {
          console.error(
            'Error loading layout collapsed state from localStorage:',
            error
          );
        }
      };
    },
    multi: true,
  },
];
