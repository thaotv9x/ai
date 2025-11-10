import { Routes } from '@angular/router';
import { EntitiesListComponent } from './entities-list-component/entities-list-component';
import { EntitiesUpsertComponent } from './entities-upsert-component/entities-upsert-component';

export const routerEntity: Routes = [
  { path: '', component: EntitiesListComponent },
  { path: 'upsert', component: EntitiesUpsertComponent },
];
