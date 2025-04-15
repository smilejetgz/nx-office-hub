import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, of, Subscription, timer } from 'rxjs';
import { auditTime, delayWhen, distinctUntilChanged, map, scan } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { MenuFoldOutline, MenuUnfoldOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutService } from '../../services/layouts.service';
import { MenuItems } from './admin.model';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
export class AdminComponent implements OnInit, OnDestroy, AfterViewInit {
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  iconDefault: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline];

  isSmallScreen = false;
  isCollapsed = false;
  windowWidth = window.innerWidth;

  menuItems!: MenuItems[];

  private resizeSubscription?: Subscription;
  private collapsedSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private iconService: NzIconService
  ) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'];
      const menuIcons: IconDefinition[] = this.menuItems.map((item) => item.icon).filter(Boolean);

      this.registerMenuIcons([...this.iconDefault, ...menuIcons]);
    });

    this.layoutService.isSmallScreen$.pipe(takeUntilDestroyed()).subscribe((smallScreen) => {
      this.isSmallScreen = smallScreen;
    });

    this.layoutService.loadCollapsedFromLocalStorage();
  }

  private registerMenuIcons(icon: IconDefinition[]): void {
    this.iconService.addIcon(...icon);
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

  ngAfterViewInit(): void {
    this.collapsedSubscription = this.layoutService.isCollapsed$
      .pipe(
        scan((acc, value) => ({ count: acc.count + 1, value }), {
          count: 0,
          value: false,
        }),
        delayWhen((state) => (state.count === 1 ? timer(1000) : of(null)))
      )
      .subscribe((state) => {
        this.isCollapsed = state.value;
        this.cdr.detectChanges();
      });
  }

  handleResize(width: number): void {
    this.windowWidth = width;
    const small = width < 576;
    this.layoutService.setSmallScreen(small);
  }

  ngOnDestroy(): void {
    this.collapsedSubscription?.unsubscribe();
    this.resizeSubscription?.unsubscribe();
  }
}
