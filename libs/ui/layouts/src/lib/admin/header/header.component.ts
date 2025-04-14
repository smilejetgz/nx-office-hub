import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  MoonOutline,
  SunOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { ThemeService } from '@nx-office-hub/themes';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'lib-header',
  imports: [
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed = true;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  private themeService = inject(ThemeService);
  private iconService = inject(NzIconService);

  isThemeDark = false;

  constructor() {
    this.iconService.addIcon(
      MoonOutline,
      SunOutline,
      UserOutline as IconDefinition
    );
  }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.isThemeDark = theme === 'dark';
    });

    const storedIsCollapsed = localStorage.getItem('isCollapsed');
    if (storedIsCollapsed !== null) {
      this.isCollapsed = JSON.parse(storedIsCollapsed);
      this.isCollapsedChange.emit(this.isCollapsed);
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('isCollapsed', JSON.stringify(this.isCollapsed));
    this.isCollapsedChange.emit(this.isCollapsed);
    console.log(this.isCollapsed);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
