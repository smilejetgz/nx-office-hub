import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { MoonOutline, SunOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { ThemeService } from '../../../theme.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzGridModule, NzButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  isThemeDark = false;

  toggleCollapsed: () => void = () => {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
    console.log(this.isCollapsed);
  };

  toggleTheme: () => Promise<void> = async () => {
    await this.themeService.toggleTheme();
    const themeElement = document.querySelector('html.dark') as HTMLElement;
    this.isThemeDark = themeElement ? true : false;
  };

  private themeService = inject(ThemeService);
  private iconService = inject(NzIconService);

  constructor() {
    this.iconService.addIcon(MoonOutline, SunOutline as IconDefinition);
  }
}
