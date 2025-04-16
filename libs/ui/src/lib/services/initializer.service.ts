import { EnvironmentProviders, inject, Injectable, Provider } from '@angular/core';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { LayoutService } from './layouts.service';
import { ThemeService } from './theme.service';

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
