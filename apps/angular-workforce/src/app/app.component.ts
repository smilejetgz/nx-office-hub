import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconService } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  FormOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
} from '@ant-design/icons-angular/icons';
import { SiderComponent } from './shared/layouts/sider/sider.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { IconDefinition } from '@ant-design/icons-angular';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,

    SiderComponent,
    HeaderComponent,

    NzLayoutModule,
    NzButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  private iconService = inject(NzIconService);
  isCollapsed = false;
  isThemeDark = false;
  isSmallScreen = false;
  windowWidth = window.innerWidth;

  constructor() {
    this.iconService.addIcon(
      MenuFoldOutline,
      MenuUnfoldOutline,
      DashboardOutline,
      FormOutline as IconDefinition
    );
  }

  ngOnInit(): void {
    this.onResize({ target: window });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event | { target: Window }): void {
    const width = (event.target as Window).innerWidth;
    this.windowWidth = width;
    this.isSmallScreen = width < 576;
  }
}
