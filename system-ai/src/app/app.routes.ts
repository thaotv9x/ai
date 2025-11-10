import { Routes } from '@angular/router';
import { Forbidden } from './layouts/forbidden/forbidden';
import { NotFound } from './layouts/not-found/not-found';
import { MainComponent } from './layouts/main/main';
import { LoginComponent } from './layouts/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'system',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'template/entity',
        pathMatch: 'full',
      },
      {
        path: 'template',
        loadChildren: () =>
          import('./layouts/entities/template-router').then(
            (m) => m.routerTemplate
          ),
      },
    ],
  },
  { path: 'forbidden', component: Forbidden },
  { path: 'notfound', component: NotFound },
  { path: '**', component: NotFound },
];
