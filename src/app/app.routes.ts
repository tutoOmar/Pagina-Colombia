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
            path: 'touristic-attractions/:id', 
            loadComponent: () => import('./pages/touristic-attractions/touristic-attraction/touristic-attraction.component')
        },
                {
            path: 'cities',
            loadComponent: () => import('./pages/cities/cities.component')
        },
        {
            path: 'cities/:id', 
            loadComponent: () => import('./pages/cities/city/city.component')
        },
        {
            path: '**',
            redirectTo: 'home',
            pathMatch: 'full'
        }
    ];
