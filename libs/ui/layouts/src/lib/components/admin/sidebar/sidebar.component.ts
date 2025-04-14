import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutService } from '../../../services/layouts.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-sidebar',
  imports: [NzMenuModule, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private layoutService = inject(LayoutService);

  isCollapsed = false;

  constructor() {
    this.layoutService.isCollapsed$
      .pipe(takeUntilDestroyed())
      .subscribe((collapsed) => {
        this.isCollapsed = collapsed;
      });
  }
}
