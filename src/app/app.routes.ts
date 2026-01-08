import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'touristic-attractions',
        loadComponent: () => import('./pages/touristic-attractions/touristic-attractions.component')
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
