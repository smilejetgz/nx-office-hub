import { Injectable } from '@angular/core';

enum ThemeType {
  dark = 'dark',
  default = 'default',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = ThemeType.default;

  private reverseTheme(theme: string): ThemeType {
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

  public loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.currentTheme;
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
          }
          this.removeUnusedTheme(this.reverseTheme(theme));
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }

  public loadThemeLocalStorage(): Promise<Event> {
    const theme = localStorage.getItem('theme') as ThemeType;
    if (theme) {
      this.currentTheme = theme;
    } else {
      this.currentTheme = ThemeType.default;
    }
    return this.loadTheme(true);
  }

  public toggleTheme(): Promise<Event> {
    this.currentTheme = this.reverseTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    return this.loadTheme(false);
  }
}
