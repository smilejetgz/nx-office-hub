import {
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  throttleTime,
  auditTime,
} from 'rxjs/operators';

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
import { LayoutService } from '../../services/layouts.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    NzLayoutModule,
    NzButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less',
})
export class AdminComponent implements OnInit, OnDestroy {
  private iconService = inject(NzIconService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private layoutService = inject(LayoutService);

  isSmallScreen = false;
  isCollapsed = false;
  windowWidth = window.innerWidth;

  private resizeSubscription?: Subscription;

  constructor() {
    this.iconService.addIcon(
      MenuFoldOutline,
      MenuUnfoldOutline,
      DashboardOutline,
      FormOutline as IconDefinition
    );

    this.layoutService.isSmallScreen$
      .pipe(takeUntilDestroyed())
      .subscribe((smallScreen) => {
        this.isSmallScreen = smallScreen;
      });

    this.layoutService.isCollapsed$
      .pipe(takeUntilDestroyed())
      .subscribe((collapsed) => {
        this.isCollapsed = collapsed;
      });
  }

  ngOnInit(): void {
    this.handleResize(window.innerWidth);
    this.cdr.detectChanges();

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        map((event: Event) => (event.target as Window).innerWidth),
        auditTime(1000),
        distinctUntilChanged()
      )
      .subscribe((width) => {
        this.ngZone.run(() => {
          this.handleResize(width);
        });
      });
  }

  handleResize(width: number): void {
    // console.log('🔥 handleResize called with:', width);
    this.windowWidth = width;
    const small = width < 576;
    this.layoutService.setSmallScreen(small);
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe();
  }
}
