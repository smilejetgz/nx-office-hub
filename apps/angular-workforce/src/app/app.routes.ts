import { Routes } from '@angular/router';
import { AdminComponent } from '@nx-office-hub/layouts';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome',
  },
  {
    path: 'welcome',
    component: AdminComponent,
    loadChildren: () => import('./pages/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
  },
];
