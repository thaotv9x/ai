import { Routes } from '@angular/router';
import { Forbidden } from './layouts/forbidden/forbidden';
import { NotFound } from './layouts/not-found/not-found';
import { MainComponent } from './layouts/main/main';

export const routes: Routes = [
    {
        path: '', component: MainComponent, children: []
    },
    { path: 'forbidden', component: Forbidden },
    { path: '**', component: NotFound }
];
