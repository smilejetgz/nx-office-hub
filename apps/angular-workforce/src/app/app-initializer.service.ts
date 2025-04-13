import { ThemeService } from './theme.service';

import { provideAppInitializer } from '@angular/core';

export const AppInitializerProvider = provideAppInitializer(async () => {
  const themeService = new ThemeService();
  try {
    await themeService.loadTheme();
    console.log('Theme loaded successfully');
  } catch (error) {
    console.error('Error loading theme:', error);
  }
});
