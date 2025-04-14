import { Component, inject, Input } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { MoonOutline, SunOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { ThemeService } from '@nx-office-hub/themes';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LayoutService } from '../../../services/layouts.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
