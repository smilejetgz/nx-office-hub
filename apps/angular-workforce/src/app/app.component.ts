import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ThemeService } from './theme.service';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconService } from 'ng-zorro-antd/icon';
import { MoonOutline } from '@ant-design/icons-angular/icons';
@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,

    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  private iconService = inject(NzIconService);
  private themeService = inject(ThemeService);
  isCollapsed = false;

  constructor() {
    this.iconService.addIcon(MoonOutline as IconDefinition);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }
}
