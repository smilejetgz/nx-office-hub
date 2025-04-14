import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { MoonOutline, SunOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { ThemeService } from '@nx-office-hub/themes';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'lib-header',
  imports: [NzIconModule, NzGridModule, NzButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed = true;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  isThemeDark = false;

  async ngOnInit(): Promise<void> {
    await this.themeService.loadThemeLocalStorage();
    this.isThemeDark = this.themeService.currentTheme === 'dark';

    const storedIsCollapsed = localStorage.getItem('isCollapsed');
    if (storedIsCollapsed !== null) {
      this.isCollapsed = JSON.parse(storedIsCollapsed);
      this.isCollapsedChange.emit(this.isCollapsed);
    }
  }

  toggleCollapsed: () => void = () => {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('isCollapsed', JSON.stringify(this.isCollapsed));
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
