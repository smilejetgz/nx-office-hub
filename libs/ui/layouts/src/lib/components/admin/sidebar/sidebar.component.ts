import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'lib-sidebar',
  imports: [NzMenuModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isCollapsed = false;
}
