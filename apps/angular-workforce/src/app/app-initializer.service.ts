import { ThemeService } from './theme.service';
import { provideAppInitializer } from '@angular/core';

export const AppInitializerProvider = provideAppInitializer(async () => {
  const themeService = new ThemeService();
  try {
    await themeService.loadThemeLocalStorage();
    console.log('Theme loaded successfully from localStorage');
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
  }
});
