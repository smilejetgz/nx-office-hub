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
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { IconDefinition } from '@ant-design/icons-angular';

@Component({
  selector: 'lib-admin',
  imports: [
    RouterOutlet,

    SidebarComponent,
    HeaderComponent,

    NzLayoutModule,
    NzButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less',
})
export class AdminComponent implements OnInit {
  private iconService = inject(NzIconService);
  isCollapsed = true;
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
