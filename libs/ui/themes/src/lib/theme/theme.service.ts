import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<ThemeType>(
    ThemeType.default
  );
  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.loadThemeFromLocalStorage();
  }

  private reverseTheme(theme: ThemeType): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  public loadThemeFromLocalStorage(): void {
    const theme =
      (localStorage.getItem('site-theme') as ThemeType) || ThemeType.default;
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme, true);
  }

  private applyTheme(theme: ThemeType, firstLoad: boolean): void {
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    this.loadCss(`${theme}.css`, theme).then(() => {
      if (!firstLoad) {
        document.documentElement.classList.add(theme);
      }
      this.removeUnusedTheme(this.reverseTheme(theme));
    });
  }

  public toggleTheme(): void {
    const newTheme = this.reverseTheme(this.currentThemeSubject.value);
    this.currentThemeSubject.next(newTheme);
    localStorage.setItem('site-theme', newTheme);
    this.applyTheme(newTheme, false);
  }
}
