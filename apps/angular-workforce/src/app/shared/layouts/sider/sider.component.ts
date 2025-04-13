import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-sider',
  imports: [RouterLink, NzMenuModule],
  templateUrl: './sider.component.html',
})
export class SiderComponent {
  @Input() isCollapsed = false;
}
