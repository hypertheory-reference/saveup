import { inject } from '@angular/core';
import { CanActivateFn, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserLoggedIn } from './state';
import { HomeComponent } from './components/home.component';


export const appRoutes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('@startup/dashboard').then(m => m.dashboardRoutes)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

export function authGuard(): CanActivateFn {
    return () => {
        const isLoggedIn = inject(Store).selectSignal(selectUserLoggedIn);
        return isLoggedIn();
    }
}