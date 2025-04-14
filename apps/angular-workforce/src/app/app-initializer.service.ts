import { Injectable, inject, Provider, EnvironmentProviders } from '@angular/core';
import { ThemeService } from '@nx-office-hub/themes';
import { LayoutService } from '@nx-office-hub/layouts';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private themeService: ThemeService,
    private layoutService: LayoutService
  ) {}

  async initialize(): Promise<void> {
    try {
      await Promise.resolve();
      this.layoutService.loadCollapsedFromLocalStorage();
      this.themeService.loadThemeFromLocalStorage();
    } catch (error) {
      console.error('APP_INITIALIZER error:', error);
    }
  }
}

export const AppInitializerProvider: (Provider | EnvironmentProviders)[] = [
  provideNzI18n(en_US),
  {
    provide: 'APP_INITIALIZER_FACTORY',
    useFactory: () => {
      const service = inject(AppInitializerService);
      return () => service.initialize();
    },
    multi: true,
  },
];
