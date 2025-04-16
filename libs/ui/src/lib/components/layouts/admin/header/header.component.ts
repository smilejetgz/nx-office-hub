import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconDefinition } from '@ant-design/icons-angular';
import { MoonOutline, SunOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { LayoutService, ThemeService } from '../../../../services';

@Component({
  selector: 'lib-header',
  imports: [
    CommonModule,
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isCollapsed = false;

  private themeService = inject(ThemeService);
  private iconService = inject(NzIconService);
  private layoutService = inject(LayoutService);

  isThemeDark = false;
  isSmallScreen = false;

  constructor() {
    this.iconService.addIcon(MoonOutline, SunOutline, UserOutline as IconDefinition);

    this.themeService.currentTheme$.pipe(takeUntilDestroyed()).subscribe((theme) => {
      this.isThemeDark = theme === 'dark';
    });

    this.layoutService.isSmallScreen$.pipe(takeUntilDestroyed()).subscribe((smallScreen) => {
      this.isSmallScreen = smallScreen;
    });
  }

  toggleCollapsed(): void {
    this.layoutService.toggleCollapsed();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
