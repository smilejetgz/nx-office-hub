import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuItems } from '../../../../models/layout-admin';

@Component({
  selector: 'lib-sidebar',
  imports: [CommonModule, NzMenuModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() menuItems!: MenuItems[];
}
