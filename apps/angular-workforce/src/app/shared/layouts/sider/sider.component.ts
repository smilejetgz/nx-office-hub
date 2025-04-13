import { Component, Input } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-sider',
  imports: [NzMenuModule],
  templateUrl: './sider.component.html',
})
export class SiderComponent {
  @Input() isCollapsed = false;
}
