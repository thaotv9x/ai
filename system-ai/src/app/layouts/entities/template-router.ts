import { Routes } from '@angular/router';

export const routerTemplate: Routes = [
  {
    path: 'entity',
    loadChildren: () =>
      import('./pages/entities-router').then(m => m.routerEntity),
  },
];
