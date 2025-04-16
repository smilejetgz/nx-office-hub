import { Routes } from '@angular/router';
import { AdminComponent } from '@nx-office-hub/ui';
import menuItems from './features/shared/menu';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
  },
  {
    path: 'welcome',
    component: AdminComponent,
    data: { menuItems },
    loadChildren: () => import('./pages/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
  },
];
